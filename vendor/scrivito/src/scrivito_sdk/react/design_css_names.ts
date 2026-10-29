// The CSS identifiers a design is written as: the presence token in `data-scrivito-design`, the
// custom property carrying the value, and the CSS property it ends up in. They are the contract
// between the two halves of the mechanism — the prop bag written here at render time, and the
// band stylesheet generated at release time — so they live with the half a website runs, and the
// generator reads them from here rather than the other way round.

import { DesignBreakpoint, DesignPropertyName } from 'scrivito_sdk/models';

/**
 * The CSS property a value is assigned to, which is the kebab-case spelling of its name for
 * every property this is asked about. `hidden` is the one that would differ — it renders as
 * `display` — and the generator never asks, because its declaration has no value to assign.
 */
export function cssPropertyOf(name: DesignPropertyName): string {
  return kebabCase(name);
}

const BREAKPOINT_SUFFIXES: Record<DesignBreakpoint, string> = {
  desktop: '',
  tablet: '-t',
  mobile: '-m',
};

const TOKEN_SUFFIXES: Record<DesignBreakpoint, string> = {
  desktop: '',
  tablet: '@t',
  mobile: '@m',
};

/**
 * The `data-scrivito-design` token that switches `name` on for `breakpoint`, e.g.
 * `padding-top@m`. Full property names rather than abbreviations: repeated strings compress
 * away to nothing under gzip, while abbreviations make the rendered DOM unreadable for
 * anyone debugging a site.
 */
export function designTokenOf(
  name: DesignPropertyName,
  breakpoint: DesignBreakpoint,
): string {
  return `${kebabCase(name)}${TOKEN_SUFFIXES[breakpoint]}`;
}

/** The CSS custom property carrying the value of `name` at `breakpoint`. */
export function cssCustomPropertyOf(
  name: DesignPropertyName,
  breakpoint: DesignBreakpoint,
): CssCustomProperty {
  return `--sd-${kebabCase(name)}${BREAKPOINT_SUFFIXES[breakpoint]}`;
}

export type CssCustomProperty = `--sd-${string}`;

function kebabCase(name: string): string {
  return name.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
}
