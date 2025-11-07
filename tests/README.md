# API Automation Tests

Comprehensive test suite for the Discount Code System API endpoints.

## Quick Start

### Run Tests (One-Time)
```bash
npm run test:api
```

### Run Tests (Watch Mode)
```bash
npm run test:api:watch
```

This will automatically re-run tests whenever API code changes.

## Prerequisites

1. **Database**: Ensure PostgreSQL is running and migrated
2. **Dev Server**: Server must be running on `http://localhost:3500`
3. **Test Data**: Run the seed script first: `npx dotenv-cli -e .env.local -- npx tsx prisma/seed.ts`

## Test Coverage

### Validated Endpoints

#### 1. `/api/discount/validate` (GET)
- ✅ Valid discount codes
- ✅ Invalid/non-existent codes
- ✅ Expired codes
- ✅ Inactive codes

#### 2. `/api/discount/apply` (POST)
- ✅ Successful discount application with correct price calculation
- ✅ Duplicate usage prevention (same user + same code)
- ✅ Minimum purchase amount validation
- ✅ Price mismatch detection
- ✅ Template existence validation

#### 3. `/api/checkout` (POST)
- ✅ Checkout session creation
- ✅ Purchase status updates (PENDING → PROCESSING)
- ✅ Duplicate checkout prevention
- ✅ Invalid purchase ID handling

#### 4. Edge Cases
- ✅ Missing required fields
- ✅ Invalid data types (negative amounts)
- ✅ Price tampering attempts

## Test Structure

```
tests/
├── api/
│   └── discount.test.ts    # Main test suite
├── run-tests.sh            # Test runner script
└── README.md               # This file
```

## Test Results Format

```
🧪 DISCOUNT API AUTOMATION TESTS
==================================================

📋 Testing /api/discount/validate
✅ Valid code TEST20
✅ Invalid code should fail
...

==================================================
📊 TEST SUMMARY
==================================================

Total Tests: 11
✅ Passed: 10
❌ Failed: 1
Success Rate: 90.9%
```

## Writing New Tests

The test framework provides a simple API:

```typescript
await this.test('Test name', async () => {
  const result = await this.post('/api/endpoint', { data });

  if (!result.success) {
    throw new Error('Expected success');
  }

  return result;
});
```

### Available Methods

- `test(name, fn)` - Run a test with automatic pass/fail tracking
- `post(endpoint, data)` - Make POST request
- `get(endpoint)` - Make GET request
- `setup()` - Fetch test data from database
- `printSummary()` - Display test results

## Continuous Integration

Add to your CI/CD pipeline:

```yaml
# .github/workflows/test.yml
- name: Run API Tests
  run: |
    npm run dev &
    sleep 5
    npm run test:api
```

## Troubleshooting

### Server Not Running
```
❌ Error: Server is not running on http://localhost:3500
   Please start the server with: npm run dev
```
**Solution**: Start dev server in another terminal: `npm run dev`

### Database Connection Error
**Solution**: Check `.env.local` has correct `DATABASE_URL`

### Foreign Key Errors
**Solution**: Run seed script to populate test data:
```bash
npx dotenv-cli -e .env.local -- npx tsx prisma/seed.ts
```

### Tests Failing Due to Used Codes
**Solution**: Reset discount usage or use different codes in tests

## Performance

- Average test suite runtime: ~3-5 seconds
- Tests run in series (not parallel) to avoid race conditions
- Database transactions ensure test isolation

## Future Enhancements

- [ ] Add performance/load testing
- [ ] Test concurrent code applications
- [ ] Test discount reservation expiration
- [ ] Add admin endpoint tests
- [ ] Integration with Stripe webhooks
- [ ] Test fraud detection scenarios
