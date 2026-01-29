/** Converts Bootstrap margin-bottom (mb) classes to pixel values */
export function marginBottomToPixels(
  marginClass: string | null,
): string | undefined {
  if (marginClass === 'mb-0') return '0px'
  if (marginClass === 'mb-1') return '4px' // 0.25rem
  if (marginClass === 'mb-2') return '8px' // 0.5rem
  if (marginClass === 'mb-3') return '16px' // 1rem
  if (marginClass === 'mb-4') return '24px' // 1.5rem
  if (marginClass === 'mb-5') return '48px' // 3rem

  return undefined
}
