-- CreateEnum
CREATE TYPE "discount_type" AS ENUM ('PERCENTAGE', 'FIXED');

-- CreateEnum
CREATE TYPE "usage_status" AS ENUM ('RESERVED', 'CONFIRMED', 'RELEASED', 'REFUNDED');

-- CreateEnum
CREATE TYPE "audit_action" AS ENUM ('CREATED', 'UPDATED', 'ACTIVATED', 'DEACTIVATED', 'DELETED', 'USAGE_INCREMENTED', 'USAGE_DECREMENTED', 'MANUAL_ADJUSTMENT', 'EXPIRED');

-- CreateEnum
CREATE TYPE "purchase_status" AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED', 'REFUNDED', 'PARTIALLY_REFUNDED', 'ABANDONED', 'DISPUTED');

-- CreateEnum
CREATE TYPE "user_role" AS ENUM ('CUSTOMER', 'ADMIN', 'SUPER_ADMIN');

-- CreateTable
CREATE TABLE "discount_codes" (
    "id" TEXT NOT NULL,
    "code" VARCHAR(50) NOT NULL,
    "description" VARCHAR(500),
    "internalNotes" TEXT,
    "discountType" "discount_type" NOT NULL,
    "discountValue" DOUBLE PRECISION NOT NULL,
    "maxUses" INTEGER,
    "currentUses" INTEGER NOT NULL DEFAULT 0,
    "maxUsesPerUser" INTEGER NOT NULL DEFAULT 1,
    "validFrom" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "validUntil" TIMESTAMP(3),
    "timezone" VARCHAR(50) NOT NULL DEFAULT 'UTC',
    "minPurchaseAmount" DOUBLE PRECISION,
    "maxDiscountAmount" DOUBLE PRECISION,
    "templateIds" TEXT[],
    "categoryIds" TEXT[],
    "excludedTemplateIds" TEXT[],
    "canStackWithOthers" BOOLEAN NOT NULL DEFAULT false,
    "priority" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isPublic" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT,
    "updatedBy" TEXT,
    "deactivatedAt" TIMESTAMP(3),
    "deactivatedBy" TEXT,
    "deactivationReason" TEXT,
    "totalRevenue" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalDiscountGiven" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "conversionRate" DOUBLE PRECISION,

    CONSTRAINT "discount_codes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "discount_usages" (
    "id" TEXT NOT NULL,
    "codeId" TEXT NOT NULL,
    "userId" TEXT,
    "purchaseId" TEXT NOT NULL,
    "status" "usage_status" NOT NULL DEFAULT 'RESERVED',
    "reservedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "confirmedAt" TIMESTAMP(3),
    "releasedAt" TIMESTAMP(3),
    "originalAmount" DOUBLE PRECISION NOT NULL,
    "discountAmount" DOUBLE PRECISION NOT NULL,
    "finalAmount" DOUBLE PRECISION NOT NULL,
    "taxAmount" DOUBLE PRECISION,
    "discountSnapshot" JSONB NOT NULL,
    "ipAddress" VARCHAR(45),
    "userAgent" TEXT,
    "deviceFingerprint" VARCHAR(255),
    "geoCountry" VARCHAR(2),
    "geoCity" VARCHAR(100),
    "riskScore" DOUBLE PRECISION DEFAULT 0,
    "riskFactors" TEXT[],
    "isManuallyReviewed" BOOLEAN NOT NULL DEFAULT false,
    "reviewedBy" TEXT,
    "reviewedAt" TIMESTAMP(3),
    "reviewNotes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "discount_usages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "discount_audit_logs" (
    "id" TEXT NOT NULL,
    "codeId" TEXT NOT NULL,
    "action" "audit_action" NOT NULL,
    "performedBy" TEXT,
    "performedByType" TEXT NOT NULL DEFAULT 'USER',
    "changesBefore" JSONB,
    "changesAfter" JSONB,
    "reason" TEXT,
    "ipAddress" VARCHAR(45),
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "discount_audit_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "purchases" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "templateId" TEXT NOT NULL,
    "basePrice" DOUBLE PRECISION NOT NULL,
    "finalPrice" DOUBLE PRECISION NOT NULL,
    "currency" VARCHAR(3) NOT NULL DEFAULT 'USD',
    "status" "purchase_status" NOT NULL DEFAULT 'PENDING',
    "stripePaymentIntentId" TEXT,
    "stripeCustomerId" TEXT,
    "stripeInvoiceId" TEXT,
    "paymentMethod" TEXT,
    "last4" VARCHAR(4),
    "cardBrand" VARCHAR(20),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "completedAt" TIMESTAMP(3),
    "failedAt" TIMESTAMP(3),
    "refundedAt" TIMESTAMP(3),
    "refundReason" TEXT,
    "refundAmount" DOUBLE PRECISION,
    "partialRefund" BOOLEAN NOT NULL DEFAULT false,
    "licenseKey" VARCHAR(100),
    "downloadUrl" TEXT,
    "downloadCount" INTEGER NOT NULL DEFAULT 0,
    "downloadExpiresAt" TIMESTAMP(3),
    "customerEmail" VARCHAR(255) NOT NULL,
    "customerName" VARCHAR(255),
    "billingAddress" JSONB,
    "metadata" JSONB,

    CONSTRAINT "purchases_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isBanned" BOOLEAN NOT NULL DEFAULT false,
    "bannedReason" TEXT,
    "bannedAt" TIMESTAMP(3),
    "role" "user_role" NOT NULL DEFAULT 'CUSTOMER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lastLoginAt" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "templates" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "slug" VARCHAR(255) NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "currency" VARCHAR(3) NOT NULL DEFAULT 'USD',
    "categoryId" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "templates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "discount_analytics" (
    "id" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "codeId" TEXT,
    "impressions" INTEGER NOT NULL DEFAULT 0,
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "successes" INTEGER NOT NULL DEFAULT 0,
    "failures" INTEGER NOT NULL DEFAULT 0,
    "totalRevenue" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalDiscounts" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "avgOrderValue" DOUBLE PRECISION,
    "conversionRate" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "discount_analytics_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "discount_codes_code_key" ON "discount_codes"("code");

-- CreateIndex
CREATE INDEX "discount_codes_code_idx" ON "discount_codes"("code");

-- CreateIndex
CREATE INDEX "discount_codes_isActive_validFrom_validUntil_idx" ON "discount_codes"("isActive", "validFrom", "validUntil");

-- CreateIndex
CREATE INDEX "discount_codes_createdBy_idx" ON "discount_codes"("createdBy");

-- CreateIndex
CREATE UNIQUE INDEX "discount_usages_purchaseId_key" ON "discount_usages"("purchaseId");

-- CreateIndex
CREATE INDEX "discount_usages_codeId_userId_idx" ON "discount_usages"("codeId", "userId");

-- CreateIndex
CREATE INDEX "discount_usages_status_expiresAt_idx" ON "discount_usages"("status", "expiresAt");

-- CreateIndex
CREATE INDEX "discount_usages_userId_idx" ON "discount_usages"("userId");

-- CreateIndex
CREATE INDEX "discount_usages_purchaseId_idx" ON "discount_usages"("purchaseId");

-- CreateIndex
CREATE INDEX "discount_usages_reservedAt_idx" ON "discount_usages"("reservedAt");

-- CreateIndex
CREATE UNIQUE INDEX "discount_usages_codeId_userId_status_key" ON "discount_usages"("codeId", "userId", "status");

-- CreateIndex
CREATE INDEX "discount_audit_logs_codeId_createdAt_idx" ON "discount_audit_logs"("codeId", "createdAt");

-- CreateIndex
CREATE INDEX "discount_audit_logs_performedBy_idx" ON "discount_audit_logs"("performedBy");

-- CreateIndex
CREATE UNIQUE INDEX "purchases_stripePaymentIntentId_key" ON "purchases"("stripePaymentIntentId");

-- CreateIndex
CREATE UNIQUE INDEX "purchases_licenseKey_key" ON "purchases"("licenseKey");

-- CreateIndex
CREATE INDEX "purchases_userId_status_idx" ON "purchases"("userId", "status");

-- CreateIndex
CREATE INDEX "purchases_templateId_idx" ON "purchases"("templateId");

-- CreateIndex
CREATE INDEX "purchases_status_createdAt_idx" ON "purchases"("status", "createdAt");

-- CreateIndex
CREATE INDEX "purchases_stripePaymentIntentId_idx" ON "purchases"("stripePaymentIntentId");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_email_idx" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_role_idx" ON "users"("role");

-- CreateIndex
CREATE UNIQUE INDEX "templates_slug_key" ON "templates"("slug");

-- CreateIndex
CREATE INDEX "templates_slug_idx" ON "templates"("slug");

-- CreateIndex
CREATE INDEX "templates_categoryId_idx" ON "templates"("categoryId");

-- CreateIndex
CREATE INDEX "discount_analytics_date_idx" ON "discount_analytics"("date");

-- CreateIndex
CREATE INDEX "discount_analytics_codeId_idx" ON "discount_analytics"("codeId");

-- CreateIndex
CREATE UNIQUE INDEX "discount_analytics_date_codeId_key" ON "discount_analytics"("date", "codeId");

-- AddForeignKey
ALTER TABLE "discount_usages" ADD CONSTRAINT "discount_usages_codeId_fkey" FOREIGN KEY ("codeId") REFERENCES "discount_codes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discount_usages" ADD CONSTRAINT "discount_usages_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discount_usages" ADD CONSTRAINT "discount_usages_purchaseId_fkey" FOREIGN KEY ("purchaseId") REFERENCES "purchases"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discount_audit_logs" ADD CONSTRAINT "discount_audit_logs_codeId_fkey" FOREIGN KEY ("codeId") REFERENCES "discount_codes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchases" ADD CONSTRAINT "purchases_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchases" ADD CONSTRAINT "purchases_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "templates"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
