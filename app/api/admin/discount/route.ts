import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

// Simple API key authentication (replace with proper auth later)
function validateAdminAuth(request: NextRequest): boolean {
  const apiKey = request.headers.get('x-api-key');
  const expectedKey = process.env.ADMIN_API_KEY;

  if (!expectedKey) {
    console.warn('ADMIN_API_KEY not set in environment');
    return false;
  }

  return apiKey === expectedKey;
}

// GET - List all discount codes with pagination and filtering
export async function GET(request: NextRequest) {
  try {
    // Auth check
    if (!validateAdminAuth(request)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);

    // Pagination
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    // Filters
    const isActive = searchParams.get('isActive');
    const isPublic = searchParams.get('isPublic');
    const search = searchParams.get('search');

    // Build where clause
    const where: Prisma.DiscountCodeWhereInput = {};

    if (isActive !== null) {
      where.isActive = isActive === 'true';
    }

    if (isPublic !== null) {
      where.isPublic = isPublic === 'true';
    }

    if (search) {
      where.OR = [
        { code: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ];
    }

    // Fetch codes with count
    const [codes, total] = await Promise.all([
      prisma.discountCode.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          code: true,
          description: true,
          discountType: true,
          discountValue: true,
          maxUses: true,
          currentUses: true,
          maxUsesPerUser: true,
          validFrom: true,
          validUntil: true,
          minPurchaseAmount: true,
          maxDiscountAmount: true,
          templateIds: true,
          excludedTemplateIds: true,
          isActive: true,
          isPublic: true,
          createdAt: true,
          updatedAt: true,
          totalRevenue: true,
          totalDiscountGiven: true,
          conversionRate: true
        }
      }),
      prisma.discountCode.count({ where })
    ]);

    return NextResponse.json({
      codes,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error: any) {
    console.error('Admin list discount codes error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch discount codes' },
      { status: 500 }
    );
  }
}

// POST - Create new discount code
export async function POST(request: NextRequest) {
  try {
    // Auth check
    if (!validateAdminAuth(request)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const {
      code,
      description,
      discountType,
      discountValue,
      maxUses,
      maxUsesPerUser,
      validFrom,
      validUntil,
      minPurchaseAmount,
      maxDiscountAmount,
      templateIds,
      excludedTemplateIds,
      isActive,
      isPublic,
      internalNotes
    } = body;

    // Validation
    if (!code || !discountType || discountValue === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields: code, discountType, discountValue' },
        { status: 400 }
      );
    }

    // Validate code format (uppercase alphanumeric + hyphens)
    const codeRegex = /^[A-Z0-9-]+$/;
    if (!codeRegex.test(code)) {
      return NextResponse.json(
        { error: 'Code must be uppercase letters, numbers, and hyphens only' },
        { status: 400 }
      );
    }

    // Validate discount type
    if (!['PERCENTAGE', 'FIXED'].includes(discountType)) {
      return NextResponse.json(
        { error: 'Invalid discountType. Must be PERCENTAGE or FIXED' },
        { status: 400 }
      );
    }

    // Validate discount value
    if (discountType === 'PERCENTAGE' && (discountValue < 0 || discountValue > 100)) {
      return NextResponse.json(
        { error: 'Percentage discount must be between 0 and 100' },
        { status: 400 }
      );
    }

    if (discountValue <= 0) {
      return NextResponse.json(
        { error: 'Discount value must be positive' },
        { status: 400 }
      );
    }

    // Check for duplicate code
    const existing = await prisma.discountCode.findUnique({
      where: { code }
    });

    if (existing) {
      return NextResponse.json(
        { error: 'Discount code already exists' },
        { status: 409 }
      );
    }

    // Create discount code
    const discountCode = await prisma.discountCode.create({
      data: {
        code: code.toUpperCase(),
        description: description || null,
        internalNotes: internalNotes || null,
        discountType,
        discountValue,
        maxUses: maxUses || null,
        maxUsesPerUser: maxUsesPerUser || 1,
        validFrom: validFrom ? new Date(validFrom) : new Date(),
        validUntil: validUntil ? new Date(validUntil) : null,
        minPurchaseAmount: minPurchaseAmount || null,
        maxDiscountAmount: maxDiscountAmount || null,
        templateIds: templateIds || [],
        excludedTemplateIds: excludedTemplateIds || [],
        isActive: isActive !== false,
        isPublic: isPublic !== false,
        createdBy: 'admin', // TODO: Get from auth session
        updatedBy: 'admin'
      }
    });

    // Create audit log
    await prisma.discountAuditLog.create({
      data: {
        codeId: discountCode.id,
        action: 'CREATED',
        performedBy: 'admin',
        performedByType: 'ADMIN',
        ipAddress: request.headers.get('x-forwarded-for') ||
                    request.headers.get('x-real-ip') ||
                    'unknown',
        userAgent: request.headers.get('user-agent') || 'unknown',
        reason: 'Discount code created via admin API'
      }
    });

    return NextResponse.json({
      success: true,
      code: discountCode
    }, { status: 201 });

  } catch (error: any) {
    console.error('Admin create discount code error:', error);
    return NextResponse.json(
      { error: 'Failed to create discount code' },
      { status: 500 }
    );
  }
}

// PUT - Update discount code (handled by [id]/route.ts)
// DELETE - Delete discount code (handled by [id]/route.ts)
