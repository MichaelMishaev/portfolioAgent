import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

// Force dynamic rendering - never static
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    const { purchaseId, userId, userEmail } = body;

    // Validation
    if (!purchaseId) {
      return NextResponse.json(
        { error: 'Missing required field: purchaseId' },
        { status: 400 }
      );
    }

    // Process checkout in transaction
    const result = await processCheckout({
      purchaseId,
      userId: userId || 'mock-user-id',
      userEmail: userEmail || 'test@customer.com',
      metadata: {
        ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
        userAgent: request.headers.get('user-agent') || 'unknown',
      }
    });

    return NextResponse.json({
      success: true,
      checkout: {
        purchaseId: result.purchase.id,
        sessionId: result.sessionId,
        status: result.purchase.status,
        amount: result.purchase.finalPrice,
        currency: result.purchase.currency
      },
      // Mock checkout URL - will be replaced with Stripe URL later
      checkoutUrl: `http://localhost:3500/checkout/${result.sessionId}`,
      expiresAt: result.expiresAt
    });

  } catch (error: any) {
    console.error('Checkout error:', error);
    console.error('Error stack:', error.stack);
    console.error('Error details:', JSON.stringify(error, null, 2));

    if (error.message.includes('not found')) {
      return NextResponse.json(
        { error: 'Purchase not found' },
        { status: 404 }
      );
    }

    if (error.message.includes('already processed')) {
      return NextResponse.json(
        { error: 'This purchase has already been processed' },
        { status: 400 }
      );
    }

    if (error.message.includes('expired')) {
      return NextResponse.json(
        { error: 'Discount reservation has expired' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}

// Core checkout logic
interface ProcessCheckoutParams {
  purchaseId: string;
  userId: string;
  userEmail: string;
  metadata: {
    ipAddress: string;
    userAgent: string;
  };
}

async function processCheckout(params: ProcessCheckoutParams) {
  const { purchaseId, userId, userEmail, metadata } = params;

  // Use transaction with serializable isolation
  const result = await prisma.$transaction(async (tx) => {
    // 1. Fetch purchase with related data
    const purchase = await tx.purchase.findUnique({
      where: { id: purchaseId },
      include: {
        template: {
          select: {
            id: true,
            name: true,
            price: true,
            isActive: true
          }
        },
        discountUsage: {
          include: {
            discountCode: {
              select: {
                id: true,
                code: true,
                description: true
              }
            }
          }
        }
      }
    });

    if (!purchase) {
      throw new Error('Purchase not found');
    }

    // 2. Validate purchase status
    if (purchase.status !== 'PENDING') {
      throw new Error('This purchase has already been processed or is in invalid state');
    }

    // 3. Verify template is still active
    if (!purchase.template || !purchase.template.isActive) {
      throw new Error('Template is no longer available');
    }

    // 4. Check discount reservation expiry
    const now = new Date();
    const discountUsage = purchase.discountUsage;

    if (discountUsage && discountUsage.status === 'RESERVED') {
      if (new Date(discountUsage.expiresAt) < now) {
        // Discount reservation expired - release it
        await tx.discountUsage.update({
          where: { id: discountUsage.id },
          data: {
            status: 'RELEASED',
            releasedAt: now
          }
        });

        // Decrement usage counter
        await tx.discountCode.update({
          where: { id: discountUsage.codeId },
          data: {
            currentUses: { decrement: 1 },
            updatedAt: now
          }
        });

        throw new Error('Discount reservation has expired. Please reapply the code.');
      }
    }

    // 5. Update purchase to PROCESSING
    const updatedPurchase = await tx.purchase.update({
      where: { id: purchaseId },
      data: {
        status: 'PROCESSING',
        updatedAt: now
      }
    });

    // 6. Generate mock checkout session ID (will be replaced with Stripe session)
    const sessionId = `checkout_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const expiresAt = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes

    // 7. Store checkout session info in purchase (using stripeInvoiceId temporarily)
    await tx.purchase.update({
      where: { id: purchaseId },
      data: {
        // TODO: Add stripeSessionId field to schema for proper Stripe integration
        stripeInvoiceId: sessionId, // Mock session ID for now (temporary)
        updatedAt: now
      }
    });

    // 8. Audit log (TODO: Add CHECKOUT_INITIATED to AuditAction enum)
    if (discountUsage) {
      await tx.discountAuditLog.create({
        data: {
          codeId: discountUsage.codeId,
          action: 'MANUAL_ADJUSTMENT', // Temporary - should be CHECKOUT_INITIATED
          performedBy: userId,
          performedByType: 'USER',
          ipAddress: metadata.ipAddress,
          userAgent: metadata.userAgent,
          reason: `Checkout session created: ${sessionId} for purchase ${purchase.id} ($${purchase.finalPrice})`
        }
      });
    }

    return {
      purchase: updatedPurchase,
      sessionId,
      expiresAt,
      discountUsage
    };
  }, {
    isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
    timeout: 10000 // 10 seconds
  });

  return result;
}
