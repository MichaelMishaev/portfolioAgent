import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create admin user
  const admin = await prisma.user.upsert({
    where: { email: 'admin@danuna.com' },
    update: {},
    create: {
      email: 'admin@danuna.com',
      name: 'Admin User',
      role: 'ADMIN'
    }
  });
  console.log('✅ Created admin user:', admin.email);

  // Create test customer
  const customer = await prisma.user.upsert({
    where: { email: 'test@customer.com' },
    update: {},
    create: {
      email: 'test@customer.com',
      name: 'Test Customer',
      role: 'CUSTOMER'
    }
  });
  console.log('✅ Created test customer:', customer.email);

  // Create test templates
  const templates = await Promise.all([
    prisma.template.upsert({
      where: { slug: 'modern-portfolio' },
      update: {},
      create: {
        name: 'Modern Portfolio',
        slug: 'modern-portfolio',
        price: 100,
        currency: 'USD',
        isActive: true
      }
    }),
    prisma.template.upsert({
      where: { slug: 'creative-resume' },
      update: {},
      create: {
        name: 'Creative Resume',
        slug: 'creative-resume',
        price: 50,
        currency: 'USD',
        isActive: true
      }
    }),
    prisma.template.upsert({
      where: { slug: 'business-landing' },
      update: {},
      create: {
        name: 'Business Landing Page',
        slug: 'business-landing',
        price: 150,
        currency: 'USD',
        isActive: true
      }
    })
  ]);
  console.log('✅ Created templates:', templates.map(t => t.name).join(', '));

  // Create test discount codes
  const discountCodes = await Promise.all([
    prisma.discountCode.upsert({
      where: { code: 'TEST20' },
      update: {},
      create: {
        code: 'TEST20',
        description: 'Test Discount - 20% off all templates',
        discountType: 'PERCENTAGE',
        discountValue: 20,
        maxUses: 100,
        currentUses: 0,
        isActive: true,
        isPublic: true,
        validFrom: new Date(),
        validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        createdBy: admin.id
      }
    }),
    prisma.discountCode.upsert({
      where: { code: 'SAVE50' },
      update: {},
      create: {
        code: 'SAVE50',
        description: 'Save $50 on purchases over $100',
        discountType: 'FIXED',
        discountValue: 50,
        maxUses: 50,
        currentUses: 0,
        minPurchaseAmount: 100,
        isActive: true,
        isPublic: true,
        validFrom: new Date(),
        createdBy: admin.id
      }
    }),
    prisma.discountCode.upsert({
      where: { code: 'WELCOME10' },
      update: {},
      create: {
        code: 'WELCOME10',
        description: 'Welcome discount - 10% off first purchase',
        discountType: 'PERCENTAGE',
        discountValue: 10,
        maxUses: null, // unlimited
        currentUses: 0,
        maxUsesPerUser: 1, // one per user
        isActive: true,
        isPublic: true,
        validFrom: new Date(),
        createdBy: admin.id
      }
    }),
    prisma.discountCode.upsert({
      where: { code: 'LIMITED5' },
      update: {},
      create: {
        code: 'LIMITED5',
        description: 'Limited offer - First 5 users only!',
        discountType: 'PERCENTAGE',
        discountValue: 50,
        maxUses: 5,
        currentUses: 0,
        isActive: true,
        isPublic: true,
        validFrom: new Date(),
        validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
        createdBy: admin.id
      }
    }),
    prisma.discountCode.upsert({
      where: { code: 'EXPIRED' },
      update: {},
      create: {
        code: 'EXPIRED',
        description: 'This code has expired (for testing)',
        discountType: 'PERCENTAGE',
        discountValue: 25,
        maxUses: 100,
        currentUses: 0,
        isActive: true,
        isPublic: true,
        validFrom: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
        validUntil: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // yesterday
        createdBy: admin.id
      }
    }),
    prisma.discountCode.upsert({
      where: { code: 'INACTIVE' },
      update: {},
      create: {
        code: 'INACTIVE',
        description: 'This code is inactive (for testing)',
        discountType: 'PERCENTAGE',
        discountValue: 30,
        maxUses: 100,
        currentUses: 0,
        isActive: false, // inactive
        isPublic: true,
        validFrom: new Date(),
        createdBy: admin.id
      }
    })
  ]);

  console.log('✅ Created discount codes:');
  discountCodes.forEach(code => {
    console.log(`   - ${code.code}: ${code.description}`);
  });

  console.log('');
  console.log('🎉 Seeding completed successfully!');
  console.log('');
  console.log('📊 Summary:');
  console.log(`   Users: ${await prisma.user.count()}`);
  console.log(`   Templates: ${await prisma.template.count()}`);
  console.log(`   Discount Codes: ${await prisma.discountCode.count()}`);
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
