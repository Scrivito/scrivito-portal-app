// The three breakpoints a design is stored and rendered at, and the one rule that relates
// them: `desktop` is the base, and `tablet` and `mobile` each derive from it — never from each
// other. A derived breakpoint deriving from the other one would mean editing `tablet` changed
// `mobile` as well, which is one inheritance edge more than anyone can hold in their head, and
// it is how the email builder has worked for years. The rule is small enough and settled enough
// to be spelled out where it applies rather than wrapped in a helper: `Design#get`, and the two
// places in the editor that say what an empty value follows.

/** @public */
export type DesignBreakpoint = 'desktop' | 'tablet' | 'mobile';

export const DESIGN_BREAKPOINTS: readonly DesignBreakpoint[] = [
  'desktop',
  'tablet',
  'mobile',
];

export function isDesignBreakpoint(
  breakpoint: string,
): breakpoint is DesignBreakpoint {
  return DESIGN_BREAKPOINTS.includes(breakpoint as DesignBreakpoint);
}
