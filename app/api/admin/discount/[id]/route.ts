import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Simple API key authentication
function validateAdminAuth(request: NextRequest): boolean {
  const apiKey = request.headers.get('x-api-key');
  const expectedKey = process.env.ADMIN_API_KEY;

  if (!expectedKey) {
    console.warn('ADMIN_API_KEY not set in environment');
    return false;
  }

  return apiKey === expectedKey;
}

// GET - Get single discount code by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Auth check
    if (!validateAdminAuth(request)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = await params;

    const code = await prisma.discountCode.findUnique({
      where: { id },
      include: {
        usages: {
          take: 10,
          orderBy: { createdAt: 'desc' },
          select: {
            id: true,
            userId: true,
            status: true,
            originalAmount: true,
            discountAmount: true,
            finalAmount: true,
            createdAt: true
          }
        },
        auditLogs: {
          take: 10,
          orderBy: { createdAt: 'desc' },
          select: {
            id: true,
            action: true,
            performedBy: true,
            performedByType: true,
            reason: true,
            createdAt: true
          }
        }
      }
    });

    if (!code) {
      return NextResponse.json(
        { error: 'Discount code not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ code });

  } catch (error: any) {
    console.error('Admin get discount code error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch discount code' },
      { status: 500 }
    );
  }
}

// PUT - Update discount code
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Auth check
    if (!validateAdminAuth(request)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = await params;
    const body = await request.json();

    // Fetch existing code
    const existingCode = await prisma.discountCode.findUnique({
      where: { id }
    });

    if (!existingCode) {
      return NextResponse.json(
        { error: 'Discount code not found' },
        { status: 404 }
      );
    }

    // Build update data (only include provided fields)
    const updateData: any = {
      updatedBy: 'admin',
      updatedAt: new Date()
    };

    // Allowed update fields
    const allowedFields = [
      'description',
      'internalNotes',
      'maxUses',
      'maxUsesPerUser',
      'validFrom',
      'validUntil',
      'minPurchaseAmount',
      'maxDiscountAmount',
      'templateIds',
      'excludedTemplateIds',
      'isActive',
      'isPublic'
    ];

    allowedFields.forEach(field => {
      if (body[field] !== undefined) {
        if (field === 'validFrom' || field === 'validUntil') {
          updateData[field] = body[field] ? new Date(body[field]) : null;
        } else {
          updateData[field] = body[field];
        }
      }
    });

    // Cannot update: code, discountType, discountValue after creation
    // (to maintain integrity with existing usages)

    // Update code
    const updatedCode = await prisma.discountCode.update({
      where: { id },
      data: updateData
    });

    // Create audit log
    await prisma.discountAuditLog.create({
      data: {
        codeId: id,
        action: 'UPDATED',
        performedBy: 'admin',
        performedByType: 'ADMIN',
        ipAddress: request.headers.get('x-forwarded-for') ||
                    request.headers.get('x-real-ip') ||
                    'unknown',
        userAgent: request.headers.get('user-agent') || 'unknown',
        changesBefore: existingCode as any,
        changesAfter: updatedCode as any,
        reason: body.reason || 'Updated via admin API'
      }
    });

    return NextResponse.json({
      success: true,
      code: updatedCode
    });

  } catch (error: any) {
    console.error('Admin update discount code error:', error);
    return NextResponse.json(
      { error: 'Failed to update discount code' },
      { status: 500 }
    );
  }
}

// PATCH - Activate/Deactivate discount code
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Auth check
    if (!validateAdminAuth(request)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = await params;
    const body = await request.json();
    const { action, reason } = body;

    if (!['activate', 'deactivate'].includes(action)) {
      return NextResponse.json(
        { error: 'Invalid action. Must be "activate" or "deactivate"' },
        { status: 400 }
      );
    }

    const isActive = action === 'activate';

    const updatedCode = await prisma.discountCode.update({
      where: { id },
      data: {
        isActive,
        deactivatedAt: isActive ? null : new Date(),
        deactivatedBy: isActive ? null : 'admin',
        deactivationReason: isActive ? null : reason,
        updatedBy: 'admin',
        updatedAt: new Date()
      }
    });

    // Create audit log
    await prisma.discountAuditLog.create({
      data: {
        codeId: id,
        action: isActive ? 'ACTIVATED' : 'DEACTIVATED',
        performedBy: 'admin',
        performedByType: 'ADMIN',
        ipAddress: request.headers.get('x-forwarded-for') ||
                    request.headers.get('x-real-ip') ||
                    'unknown',
        userAgent: request.headers.get('user-agent') || 'unknown',
        reason: reason || `Code ${action}d via admin API`
      }
    });

    return NextResponse.json({
      success: true,
      code: updatedCode
    });

  } catch (error: any) {
    console.error('Admin activate/deactivate discount code error:', error);
    return NextResponse.json(
      { error: 'Failed to update discount code status' },
      { status: 500 }
    );
  }
}

// DELETE - Soft delete discount code
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Auth check
    if (!validateAdminAuth(request)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const reason = searchParams.get('reason');

    // Check if code exists and has usages
    const code = await prisma.discountCode.findUnique({
      where: { id },
      include: {
        usages: {
          where: {
            status: { in: ['RESERVED', 'CONFIRMED'] }
          },
          take: 1
        }
      }
    });

    if (!code) {
      return NextResponse.json(
        { error: 'Discount code not found' },
        { status: 404 }
      );
    }

    // Prevent deletion if there are active usages
    if (code.usages.length > 0) {
      return NextResponse.json(
        {
          error: 'Cannot delete code with active usages. Deactivate instead.',
          activeUsages: code.usages.length
        },
        { status: 400 }
      );
    }

    // Soft delete by deactivating and marking as deleted
    const updatedCode = await prisma.discountCode.update({
      where: { id },
      data: {
        isActive: false,
        isPublic: false,
        deactivatedAt: new Date(),
        deactivatedBy: 'admin',
        deactivationReason: reason || 'Deleted via admin API',
        updatedBy: 'admin',
        updatedAt: new Date()
      }
    });

    // Create audit log
    await prisma.discountAuditLog.create({
      data: {
        codeId: id,
        action: 'DELETED',
        performedBy: 'admin',
        performedByType: 'ADMIN',
        ipAddress: request.headers.get('x-forwarded-for') ||
                    request.headers.get('x-real-ip') ||
                    'unknown',
        userAgent: request.headers.get('user-agent') || 'unknown',
        reason: reason || 'Code deleted via admin API'
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Discount code deactivated (soft deleted)',
      code: updatedCode
    });

  } catch (error: any) {
    console.error('Admin delete discount code error:', error);
    return NextResponse.json(
      { error: 'Failed to delete discount code' },
      { status: 500 }
    );
  }
}
