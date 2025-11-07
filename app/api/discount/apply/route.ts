import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { calculateDiscount } from '@/lib/discount/calculator';
import { sanitizeDiscountCode } from '@/lib/discount/validator';
import { Prisma } from '@prisma/client';

// Force dynamic rendering - never static
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    const { code: codeInput, templateId, cartTotal, userId, userEmail } = body;

    // Validation
    if (!codeInput || !templateId || !cartTotal) {
      return NextResponse.json(
        { error: 'Missing required fields: code, templateId, cartTotal' },
        { status: 400 }
      );
    }

    if (typeof cartTotal !== 'number' || cartTotal <= 0) {
      return NextResponse.json(
        { error: 'Invalid cart total' },
        { status: 400 }
      );
    }

    // For now, we'll use mock user data if not provided
    // In production, you'd get this from session/auth
    const mockUserId = userId || 'mock-user-id';
    const mockUserEmail = userEmail || 'test@customer.com';

    // Sanitize code
    let codeStr: string;
    try {
      codeStr = sanitizeDiscountCode(codeInput);
    } catch (error: any) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    // Get template info
    const template = await prisma.template.findUnique({
      where: { id: templateId },
      select: {
        id: true,
        price: true,
        isActive: true,
        name: true
      }
    });

    if (!template || !template.isActive) {
      return NextResponse.json(
        { error: 'Template not found or inactive' },
        { status: 404 }
      );
    }

    // Verify cart total matches template price
    if (Math.abs(template.price - cartTotal) > 0.01) {
      return NextResponse.json(
        { error: 'Price mismatch' },
        { status: 400 }
      );
    }

    // Apply discount code (atomic transaction)
    const result = await applyDiscountCode({
      code: codeStr,
      userId: mockUserId,
      userEmail: mockUserEmail,
      templateId,
      cartTotal,
      metadata: {
        ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
        userAgent: request.headers.get('user-agent') || 'unknown',
      }
    });

    return NextResponse.json({
      success: true,
      purchase: {
        id: result.purchase.id,
        basePrice: result.purchase.basePrice,
        finalPrice: result.purchase.finalPrice,
        status: result.purchase.status
      },
      discount: {
        code: result.code.code,
        description: result.code.description,
        discountAmount: result.discountAmount,
        discountType: result.code.discountType,
        discountValue: result.code.discountValue
      },
      template: {
        id: template.id,
        name: template.name
      }
    });

  } catch (error: any) {
    console.error('Apply discount error:', error);

    // Handle known errors
    if (error.message.includes('already used')) {
      return NextResponse.json(
        { error: 'You have already used this code' },
        { status: 400 }
      );
    }

    if (error.message.includes('fully used')) {
      return NextResponse.json(
        { error: 'This code has reached its usage limit' },
        { status: 400 }
      );
    }

    if (error.message.includes('expired')) {
      return NextResponse.json(
        { error: 'This code has expired' },
        { status: 400 }
      );
    }

    if (error.message.includes('Minimum purchase')) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to apply discount code' },
      { status: 500 }
    );
  }
}

// Core application logic
interface ApplyDiscountParams {
  code: string;
  userId: string;
  userEmail: string;
  templateId: string;
  cartTotal: number;
  metadata: {
    ipAddress: string;
    userAgent: string;
  };
}

async function applyDiscountCode(params: ApplyDiscountParams) {
  const { code: codeStr, userId, userEmail, templateId, cartTotal, metadata } = params;

  // Use transaction with serializable isolation
  const result = await prisma.$transaction(async (tx) => {
    // 1. Lock and fetch discount code (CRITICAL: prevents race conditions)
    const code = await tx.discountCode.findUnique({
      where: { code: codeStr },
    });

    if (!code) {
      throw new Error('Invalid discount code');
    }

    // 2. Comprehensive validation
    if (!code.isActive) {
      throw new Error('This code is no longer active');
    }

    const now = new Date();

    if (code.validFrom && new Date(code.validFrom) > now) {
      throw new Error('This code is not yet active');
    }

    if (code.validUntil && new Date(code.validUntil) < now) {
      throw new Error('This code has expired');
    }

    if (code.maxUses !== null && code.currentUses >= code.maxUses) {
      throw new Error('This code has been fully used');
    }

    // 3. Check user hasn't already used this code
    const existingUsage = await tx.discountUsage.findFirst({
      where: {
        codeId: code.id,
        userId: userId,
        status: { in: ['RESERVED', 'CONFIRMED'] }
      }
    });

    if (existingUsage) {
      throw new Error('You have already used this code');
    }

    // 4. Check template restrictions
    if (code.templateIds && code.templateIds.length > 0) {
      if (!code.templateIds.includes(templateId)) {
        throw new Error('This code is not valid for this template');
      }
    }

    if (code.excludedTemplateIds && code.excludedTemplateIds.length > 0) {
      if (code.excludedTemplateIds.includes(templateId)) {
        throw new Error('This code is not valid for this template');
      }
    }

    // 5. Check minimum purchase requirement
    if (code.minPurchaseAmount && cartTotal < code.minPurchaseAmount) {
      throw new Error(
        `Minimum purchase of $${code.minPurchaseAmount} required for this code`
      );
    }

    // 6. Calculate discount amount
    const { discountAmount, finalTotal } = calculateDiscount({
      discountType: code.discountType as 'PERCENTAGE' | 'FIXED',
      discountValue: code.discountValue,
      maxDiscountAmount: code.maxDiscountAmount,
      cartTotal
    });

    // 7. Create purchase record
    const purchase = await tx.purchase.create({
      data: {
        userId,
        templateId,
        basePrice: cartTotal,
        finalPrice: finalTotal,
        status: 'PENDING',
        customerEmail: userEmail,
        currency: 'USD'
      }
    });

    // 8. Atomic increment of usage counter (CRITICAL)
    await tx.discountCode.update({
      where: { id: code.id },
      data: {
        currentUses: { increment: 1 },
        updatedAt: new Date()
      }
    });

    // 9. Create discount usage record
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

    const usage = await tx.discountUsage.create({
      data: {
        codeId: code.id,
        userId,
        purchaseId: purchase.id,
        status: 'RESERVED',
        reservedAt: new Date(),
        expiresAt,
        originalAmount: cartTotal,
        discountAmount,
        finalAmount: finalTotal,
        discountSnapshot: code as any, // Snapshot of code config
        ipAddress: metadata.ipAddress,
        userAgent: metadata.userAgent,
        riskScore: 0, // TODO: Implement fraud detection
        riskFactors: []
      }
    });

    // 10. Audit log
    await tx.discountAuditLog.create({
      data: {
        codeId: code.id,
        action: 'USAGE_INCREMENTED',
        performedBy: userId,
        performedByType: 'USER',
        ipAddress: metadata.ipAddress,
        userAgent: metadata.userAgent
      }
    });

    return {
      purchase,
      usage,
      code,
      discountAmount
    };
  }, {
    isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
    timeout: 10000 // 10 seconds
  });

  return result;
}
