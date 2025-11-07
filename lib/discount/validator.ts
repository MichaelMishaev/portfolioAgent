// Discount code validation utilities

export interface ValidationResult {
  valid: boolean;
  reason?: string;
  message?: string;
}

export function validateDiscountCode(code: any): ValidationResult {
  // Check if active
  if (!code.isActive) {
    return {
      valid: false,
      reason: 'INACTIVE',
      message: 'This code is no longer active'
    };
  }

  // Check if public (for public validation endpoint)
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

export function sanitizeDiscountCode(input: string): string {
  if (!input || typeof input !== 'string') {
    throw new Error('Invalid input');
  }

  // Remove whitespace
  let sanitized = input.trim();

  // Convert to uppercase
  sanitized = sanitized.toUpperCase();

  // Remove non-alphanumeric except hyphens
  sanitized = sanitized.replace(/[^A-Z0-9-]/g, '');

  // Length validation
  if (sanitized.length < 3 || sanitized.length > 50) {
    throw new Error('Code must be 3-50 characters');
  }

  return sanitized;
}
