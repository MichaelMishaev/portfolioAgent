import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    // Get code from query params
    const searchParams = request.nextUrl.searchParams;
    const codeInput = searchParams.get('code');

    if (!codeInput) {
      return NextResponse.json(
        { error: 'Code parameter required' },
        { status: 400 }
      );
    }

    // Sanitize input
    const code = codeInput.trim().toUpperCase().replace(/[^A-Z0-9-]/g, '');

    if (code.length < 3 || code.length > 50) {
      return NextResponse.json(
        {
          valid: false,
          reason: 'INVALID_FORMAT',
          message: 'Code must be 3-50 characters'
        },
        { status: 200 }
      );
    }

    // Fetch code from database
    const discountCode = await prisma.discountCode.findUnique({
      where: { code },
      select: {
        id: true,
        code: true,
        description: true,
        discountType: true,
        discountValue: true,
        maxUses: true,
        currentUses: true,
        validFrom: true,
        validUntil: true,
        minPurchaseAmount: true,
        maxDiscountAmount: true,
        isActive: true,
        isPublic: true,
      }
    });

    if (!discountCode) {
      return NextResponse.json({
        valid: false,
        reason: 'NOT_FOUND',
        message: 'Invalid discount code'
      });
    }

    // Validate code
    const validation = validateDiscountCode(discountCode);

    if (!validation.valid) {
      return NextResponse.json({
        valid: false,
        reason: validation.reason,
        message: validation.message
      });
    }

    // Calculate available slots
    const availableSlots = discountCode.maxUses
      ? discountCode.maxUses - discountCode.currentUses
      : null;

    // Return valid code info
    return NextResponse.json({
      valid: true,
      code: {
        code: discountCode.code,
        description: discountCode.description,
        discountType: discountCode.discountType,
        discountValue: discountCode.discountValue,
        minPurchaseAmount: discountCode.minPurchaseAmount,
        maxDiscountAmount: discountCode.maxDiscountAmount,
        validUntil: discountCode.validUntil,
        availableSlots,
        isLimitedQuantity: discountCode.maxUses !== null
      }
    });

  } catch (error) {
    console.error('Discount validation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Validation helper
function validateDiscountCode(code: any): { valid: boolean; reason?: string; message?: string } {
  // Check if active
  if (!code.isActive) {
    return {
      valid: false,
      reason: 'INACTIVE',
      message: 'This code is no longer active'
    };
  }

  // Check if public
  if (!code.isPublic) {
    return {
      valid: false,
      reason: 'PRIVATE',
      message: 'This code is not available'
    };
  }

  // Check valid from date
  const now = new Date();
  if (code.validFrom && new Date(code.validFrom) > now) {
    return {
      valid: false,
      reason: 'NOT_YET_ACTIVE',
      message: `This code will be active on ${new Date(code.validFrom).toLocaleDateString()}`
    };
  }

  // Check expiry date
  if (code.validUntil && new Date(code.validUntil) < now) {
    return {
      valid: false,
      reason: 'EXPIRED',
      message: 'This code has expired'
    };
  }

  // Check usage limits
  if (code.maxUses !== null && code.currentUses >= code.maxUses) {
    return {
      valid: false,
      reason: 'FULLY_USED',
      message: 'This code has reached its usage limit'
    };
  }

  return { valid: true };
}
