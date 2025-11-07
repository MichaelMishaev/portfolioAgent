// Discount calculation utilities

export interface CalculateDiscountParams {
  discountType: 'PERCENTAGE' | 'FIXED';
  discountValue: number;
  maxDiscountAmount: number | null;
  cartTotal: number;
}

export interface CalculateDiscountResult {
  discountAmount: number;
  finalTotal: number;
}

export function calculateDiscount(params: CalculateDiscountParams): CalculateDiscountResult {
  const { discountType, discountValue, maxDiscountAmount, cartTotal } = params;

  let discountAmount = 0;

  if (discountType === 'PERCENTAGE') {
    discountAmount = (cartTotal * discountValue) / 100;
  } else if (discountType === 'FIXED') {
    discountAmount = discountValue;
  }

  // Apply max discount cap
  if (maxDiscountAmount !== null) {
    discountAmount = Math.min(discountAmount, maxDiscountAmount);
  }

  // Never exceed cart total
  discountAmount = Math.min(discountAmount, cartTotal);

  // Round to 2 decimal places
  discountAmount = Math.round(discountAmount * 100) / 100;

  const finalTotal = Math.max(0, cartTotal - discountAmount);

  return {
    discountAmount,
    finalTotal
  };
}
