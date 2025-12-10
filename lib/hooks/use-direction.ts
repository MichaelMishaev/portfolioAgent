import { useI18n } from '@/lib/i18n-context';
import { useMemo } from 'react';

export function useDirection() {
  const { dir, isRTL, flipDirection } = useI18n();

  return useMemo(() => ({
    dir,
    isRTL,
    flip: flipDirection,

    // Helper for Framer Motion
    motionDir: (value: number) => flipDirection(value),

    // Helper for CSS transforms
    translateX: (value: number) => `translateX(${flipDirection(value)}px)`,

    // Helper for flex direction
    flexDir: isRTL ? 'row-reverse' as const : 'row' as const,

    // Helper for text alignment
    align: isRTL ? 'right' as const : 'left' as const,
    alignOpposite: isRTL ? 'left' as const : 'right' as const,
  }), [dir, isRTL, flipDirection]);
}
