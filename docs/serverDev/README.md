# Discount System - Complete Implementation Guide

## 📋 Overview

This folder contains comprehensive documentation for implementing a production-ready discount code system for the portfolio template marketplace.

**Technology Stack:**
- Frontend: Next.js 15
- Backend: Next.js API Routes → Railway hosting
- Database: PostgreSQL (Railway)
- ORM: Prisma
- Payments: Stripe
- Auth: NextAuth.js

---

## 📚 Documentation Structure

Read documents in order for best understanding:

### 1. [00-OVERVIEW.md](./00-OVERVIEW.md) - Start Here
- High-level architecture
- Critical edge cases identified
- Architecture decisions & rationale
- System flow diagrams
- Success criteria

**Key Insights:**
- 47 edge cases identified and documented
- Race condition protection is critical
- Start with Next.js API routes, migrate later if needed
- Pessimistic locking for code application
- 15-minute slot reservation with timeout cleanup

---

### 2. [01-DATABASE-SCHEMA.md](./01-DATABASE-SCHEMA.md) - Database Design
- Complete Prisma schema
- Relationship diagrams
- Critical constraints
- Migration strategy
- Performance optimization

**Key Tables:**
- `DiscountCode` - Code configuration and rules
- `DiscountUsage` - Usage tracking with reservation system
- `Purchase` - Purchase records
- `DiscountAuditLog` - Audit trail

**Key Features:**
- Atomic operations via transactions
- Row-level locking for race condition prevention
- Denormalized analytics for performance
- Comprehensive audit logging

---

### 3. [02-EDGE-CASES.md](./02-EDGE-CASES.md) - Edge Case Encyclopedia
- **53 edge cases** documented with solutions
- Categories:
  - Concurrency & race conditions (5 cases)
  - Payment & transaction failures (9 cases)
  - Time & scheduling (4 cases)
  - User behavior & abuse (6 cases)
  - Business logic complexity (5 cases)
  - Data integrity (3 cases)
  - Admin & management (4 cases)
  - Security & fraud (3 cases)
  - Tax & accounting (2 cases)
  - Miscellaneous (12+ cases)

**Critical Cases:**
- EC-001: Multiple users claiming last slot (race condition)
- EC-005: Payment initiated but never completes
- EC-010: Code expires mid-checkout
- EC-014: User creates multiple accounts
- EC-022: Usage count drifts from actual

---

### 4. [03-API-IMPLEMENTATION.md](./03-API-IMPLEMENTATION.md) - API Reference
- Production-ready API code
- All endpoints documented
- Request/response examples
- Error handling patterns
- Stripe integration
- Webhook handlers
- Cron jobs

**Endpoints:**
- `GET /api/discount/validate` - Validate code
- `POST /api/discount/apply` - Apply discount
- `POST /api/checkout` - Create Stripe session
- `POST /api/webhooks/stripe` - Payment webhooks
- `GET /api/cron/release-expired` - Cleanup job
- Admin endpoints for management

---

### 5. [04-SECURITY-FRAUD-PREVENTION.md](./04-SECURITY-FRAUD-PREVENTION.md) - Security Guide
- 10-layer security model
- Threat model & risk assessment
- Input sanitization
- Rate limiting strategy
- Multi-factor fraud detection
- IP/device fingerprinting
- CAPTCHA integration
- Behavioral analysis
- Incident response plan

**Security Layers:**
1. Input validation & sanitization
2. Rate limiting
3. Fraud detection (risk scoring)
4. CAPTCHA integration
5. Authentication & authorization
6. Audit logging
7. Database security
8. Secrets management
9. Monitoring & alerts
10. Incident response

---

### 6. [05-ADMIN-PANEL.md](./05-ADMIN-PANEL.md) - Admin Interface
- Complete UI/UX requirements
- Page-by-page specifications
- Component designs
- Analytics dashboards
- Flagged transactions review
- Export functionality

**Pages:**
- `/admin/discount` - List all codes
- `/admin/discount/new` - Create code
- `/admin/discount/[id]/analytics` - Code analytics
- `/admin/usage/flagged` - Review high-risk transactions
- `/admin/analytics` - System-wide analytics

---

### 7. [06-TESTING-STRATEGY.md](./06-TESTING-STRATEGY.md) - Testing Plan
- Test pyramid structure
- Unit tests (60% coverage)
- Integration tests (30%)
- Load tests (race conditions)
- E2E tests (Playwright)
- Manual test cases
- CI/CD integration

**Key Tests:**
- Race condition test (50 users, 20 slots)
- Payment webhook tests
- Validation logic tests
- Security tests (SQL injection, XSS)
- Performance benchmarks

---

### 8. [07-DEPLOYMENT-CHECKLIST.md](./07-DEPLOYMENT-CHECKLIST.md) - Go-Live Guide
- Pre-deployment checklist
- Environment setup (Railway)
- Database migration
- Stripe configuration
- Monitoring setup (Sentry, Uptime)
- Cron jobs
- Security hardening
- Launch day procedures
- Rollback plan

**Critical Steps:**
- ✅ All tests passing
- ✅ Security audit complete
- ✅ Monitoring configured
- ✅ Backup strategy tested
- ✅ Rollback plan documented

---

## 🚀 Quick Start Guide

### Phase 1: Read & Understand (1-2 hours)
1. Read `00-OVERVIEW.md` for context
2. Skim `02-EDGE-CASES.md` to understand complexity
3. Review `01-DATABASE-SCHEMA.md` for data model

### Phase 2: Setup Development (2-3 hours)
1. Create Railway PostgreSQL database
2. Copy `01-DATABASE-SCHEMA.md` Prisma schema
3. Run `npx prisma migrate dev`
4. Set up environment variables

### Phase 3: Implement Core (1-2 weeks)
1. Copy API implementations from `03-API-IMPLEMENTATION.md`
2. Implement database operations
3. Add Stripe integration
4. Test locally

### Phase 4: Security & Testing (3-5 days)
1. Implement security measures from `04-SECURITY-FRAUD-PREVENTION.md`
2. Write tests per `06-TESTING-STRATEGY.md`
3. Run load tests
4. Security audit

### Phase 5: Admin Panel (1 week)
1. Build admin UI per `05-ADMIN-PANEL.md`
2. Implement analytics
3. Add flagged transaction review

### Phase 6: Deploy (2-3 days)
1. Follow `07-DEPLOYMENT-CHECKLIST.md`
2. Set up monitoring
3. Configure alerts
4. Launch 🎉

---

## ⚠️ Critical Warnings

### Must-Have Features (Non-Negotiable)

**1. Race Condition Protection**
Without this, you WILL oversell discount slots. Use:
- Database-level locking (`FOR UPDATE NOWAIT`)
- Atomic operations (`current_uses = current_uses + 1`)
- Transaction isolation level: `Serializable`

**2. Slot Reservation Timeout**
Without this, abandoned carts will block slots forever. Implement:
- 15-minute reservation expiry
- Cron job to release expired slots (every 5 min)
- Status tracking: `RESERVED` → `CONFIRMED` or `RELEASED`

**3. Payment Webhook Idempotency**
Stripe may send duplicate webhooks. Must have:
- Webhook event ID tracking
- Check if already processed before acting
- Idempotent operations

**4. Fraud Detection**
Without this, you'll have abuse. Minimum requirements:
- One code per user enforcement
- IP tracking
- Rate limiting (10 validations/min, 5 applications/min)
- High-risk transaction flagging

**5. Data Integrity Checks**
Usage counts can drift due to bugs. Must have:
- Nightly reconciliation job
- Alert on mismatches
- Auto-correction logic

---

## 💰 Cost Estimates

### Infrastructure (Monthly)

**Railway:**
- PostgreSQL (Starter): $5-20/month
- Compute: $10-30/month
- **Total: $15-50/month**

**Stripe:**
- 2.9% + $0.30 per transaction
- Example: 100 sales @ $100 = $320 fees

**Third-Party Services:**
- Upstash Redis (Free tier): $0
- IP Quality Score: $10-50/month
- Sentry (10k events): Free
- **Total: $10-50/month**

**Grand Total: ~$25-100/month** (scales with usage)

---

## 📊 Performance Benchmarks

### Target Metrics

| Metric | Target | Acceptable | Critical |
|--------|--------|------------|----------|
| Code validation | <200ms | <500ms | <1s |
| Code application | <500ms | <1s | <2s |
| Checkout creation | <1s | <2s | <3s |
| Webhook processing | <2s | <5s | <10s |
| Uptime | >99.9% | >99.5% | >99% |
| Error rate | <0.1% | <1% | <5% |

---

## 🐛 Known Limitations

### Current Limitations
1. **No code stacking** - Users can only apply one code per purchase
2. **No tiered discounts** - Single discount amount, not progressive
3. **No A/B testing** - No built-in split testing for codes
4. **No referral tracking** - Affiliate codes not implemented yet
5. **Basic fraud detection** - Manual review required for high-risk

### Future Enhancements (Phase 2)
- Multi-code stacking with rules engine
- Tiered discounts (spend more, save more)
- Referral code system
- Advanced fraud ML models
- Real-time analytics dashboard
- Automatic code generation campaigns
- Integration with marketing platforms

---

## 📈 Success Metrics

### Week 1 Goals
- [ ] Zero overselling incidents
- [ ] 99.9% uptime
- [ ] <500ms avg API response time
- [ ] 50+ discount codes used
- [ ] <2% customer support tickets

### Month 1 Goals
- [ ] 500+ codes used
- [ ] $10,000+ revenue via discounts
- [ ] <1% fraud incidents
- [ ] 4.5+ customer satisfaction
- [ ] Full admin panel adoption

---

## 🆘 Troubleshooting

### Common Issues

**Issue: Usage count mismatch**
```bash
# Run integrity check
curl https://yourdomain.com/api/cron/integrity-check \
  -H "Authorization: Bearer $CRON_SECRET"
```

**Issue: Slot not released after payment failure**
```bash
# Manually release
railway run npx prisma studio
# Find usage record, set status to 'RELEASED'
```

**Issue: Webhook not received**
```bash
# Check Stripe webhook logs
stripe webhooks list

# Manually trigger
stripe trigger payment_intent.succeeded
```

**Issue: High fraud scores**
```bash
# Review flagged transactions
https://yourdomain.com/admin/usage/flagged
```

---

## 📞 Support

### Questions or Issues?

1. **Check this documentation first** - 90% of questions answered here
2. **Search edge cases** in `02-EDGE-CASES.md`
3. **Review API code** in `03-API-IMPLEMENTATION.md`
4. **Check deployment checklist** if production issue

### Contributing

Found an edge case not documented? Please add it to `02-EDGE-CASES.md`.

---

## ✅ Implementation Checklist

Use this as you implement:

**Core Functionality:**
- [ ] Database schema implemented
- [ ] Code validation API
- [ ] Code application API
- [ ] Stripe checkout integration
- [ ] Payment webhooks
- [ ] Slot reservation system
- [ ] Timeout cleanup cron

**Security:**
- [ ] Input sanitization
- [ ] Rate limiting
- [ ] Fraud detection
- [ ] CAPTCHA integration
- [ ] Audit logging

**Admin:**
- [ ] Code CRUD operations
- [ ] Usage analytics
- [ ] Flagged transaction review
- [ ] Export functionality

**Testing:**
- [ ] Unit tests (>90% coverage)
- [ ] Integration tests
- [ ] Race condition tests
- [ ] E2E tests
- [ ] Load tests

**Deployment:**
- [ ] Railway database setup
- [ ] Environment variables configured
- [ ] Migrations run
- [ ] Monitoring active
- [ ] Alerts configured
- [ ] Backups tested

---

## 📝 Document Versions

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2025-11-06 | Initial comprehensive documentation |

---

## 🎯 Key Takeaways

1. **Start Simple**: Next.js API routes + Railway PostgreSQL
2. **Atomic Operations**: Race conditions are your biggest risk
3. **Timeout Everything**: 15-minute slot reservations
4. **Track Everything**: Comprehensive audit logs
5. **Test Thoroughly**: Especially race conditions
6. **Monitor Continuously**: Integrity checks nightly
7. **Plan for Fraud**: One code per user minimum
8. **Document Everything**: Edge cases will happen

---

**Good luck with your implementation!** 🚀

If you follow this documentation carefully, you'll have a production-ready discount system that handles all edge cases gracefully.

---

**Documentation Status:** ✅ Complete & Production Ready
**Total Pages:** 8 documents
**Total Word Count:** ~25,000 words
**Edge Cases Documented:** 53
**Code Examples:** 100+

**Last Updated:** 2025-11-06
**Author:** Comprehensive Planning Session
**Review Status:** Ready for Implementation
