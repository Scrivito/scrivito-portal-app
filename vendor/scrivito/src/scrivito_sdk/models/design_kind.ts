// What an app declares about the element a design is applied to — the only thing it declares,
// and only where the element is one of the two exceptions.

/**
 * How the element a design is applied to deviates from an ordinary one, and there are only two
 * ways that matter. `inline` means a size would be ignored — true of an inline element unless
 * its content is replaced, so an inline `<img>` is not one. `replaced` means the content comes
 * from outside CSS, an `<img>` or a `<video>`: it needs `objectFit`, and type reaches nothing
 * but its own fallback text.
 *
 * @public
 */
export type DesignKind = 'inline' | 'replaced';

export const DESIGN_KINDS: readonly DesignKind[] = ['inline', 'replaced'];
