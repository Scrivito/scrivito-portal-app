// The property set of the `design` attribute type.
//
// Every value is a string, deliberately: it keeps validation uniform and makes emitting CSS
// custom properties a direct copy, with no number formatting or locale concerns.

// ---------- value types ----------

export type LengthUnit = 'px' | 'rem' | 'em' | 'vh' | 'vw';

/** @public */
export type Length = `${number}${LengthUnit}`;

/** @public */
export type LengthPercentage = Length | `${number}%`;

/** @public */
export type AutoSize = LengthPercentage | 'auto';

/** @public */
export type Unitless = `${number}`;

/** @public */
export type Color = `#${string}`;

/** @public */
export type BorderStyle = 'none' | 'solid' | 'dashed' | 'dotted';

/** @public */
export type Flag = 'true' | 'false';

// ---------- the property set ----------

/**
 * Every design property, with the values it accepts. Hand-written rather than computed from
 * `DESIGN_PROPERTY_SPECS`: a mapped type over the table would drag the table itself into the
 * published types, where every internal field of a spec would become public API. The table's
 * `satisfies` clause keeps the two in step instead — see below.
 *
 * Advisory: a spec also carries bounds and a sign, which no TypeScript type can express. The
 * authority is `isValidDesignPropertyValue`, because values also arrive from the backend and
 * from the AI.
 *
 * @public
 */
export interface DesignProperties {
  // spacing
  marginTop?: LengthPercentage;
  /** `auto` — together with `marginLeft`, centres a width-constrained block */
  marginRight?: AutoSize;
  marginBottom?: LengthPercentage;
  marginLeft?: AutoSize;
  paddingTop?: LengthPercentage;
  paddingRight?: LengthPercentage;
  paddingBottom?: LengthPercentage;
  paddingLeft?: LengthPercentage;

  // visibility
  /** tri-state via absence; not applied while in-place editing */
  hidden?: Flag;

  // alignment
  textAlign?: 'left' | 'center' | 'right' | 'justify';

  // size
  width?: AutoSize;
  /** CSS has no `max-width: auto` */
  maxWidth?: LengthPercentage | 'none';
  height?: AutoSize;
  minHeight?: AutoSize;

  // media
  objectFit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';

  // text
  fontSize?: LengthPercentage;
  fontWeight?: 'normal' | 'bold';
  lineHeight?: Unitless | LengthPercentage;
  /** a percentage is invalid CSS here */
  letterSpacing?: Length;
  textTransform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
  color?: Color;

  // decoration
  backgroundColor?: Color;

  borderTopWidth?: Length;
  borderTopStyle?: BorderStyle;
  borderTopColor?: Color;
  borderRightWidth?: Length;
  borderRightStyle?: BorderStyle;
  borderRightColor?: Color;
  borderBottomWidth?: Length;
  borderBottomStyle?: BorderStyle;
  borderBottomColor?: Color;
  borderLeftWidth?: Length;
  borderLeftStyle?: BorderStyle;
  borderLeftColor?: Color;

  borderTopLeftRadius?: LengthPercentage;
  borderTopRightRadius?: LengthPercentage;
  borderBottomRightRadius?: LengthPercentage;
  borderBottomLeftRadius?: LengthPercentage;

  opacity?: Unitless;
}

/** @public */
export type DesignPropertyName = keyof DesignProperties;

// ---------- value specs ----------

// How a property's value is validated, and how it turns into CSS.
export type ValueSpec =
  | { kind: 'keyword'; keywords: readonly string[] }
  | { kind: 'color' }
  | {
      kind: 'numeric';
      // `px`, `rem`, … — an empty list means "unitless only"
      units: readonly LengthUnit[];
      percentage: boolean;
      unitless: boolean;
      negative: boolean;
      // extra bare keywords the property accepts, e.g. `auto`
      keywords: readonly string[];
      min?: number;
      max?: number;
    };

const LENGTH_UNITS: readonly LengthUnit[] = ['px', 'rem', 'em', 'vh', 'vw'];

function numeric(
  options: {
    percentage?: boolean;
    unitless?: boolean;
    negative?: boolean;
    keywords?: readonly string[];
    units?: readonly LengthUnit[];
    min?: number;
    max?: number;
  } = {},
): ValueSpec {
  return {
    kind: 'numeric',
    units: options.units ?? LENGTH_UNITS,
    percentage: options.percentage ?? false,
    unitless: options.unitless ?? false,
    negative: options.negative ?? false,
    keywords: options.keywords ?? [],
    min: options.min,
    max: options.max,
  };
}

// Generic in its arguments, so that the keyword list can be compared against the type declared
// in `DesignProperties` — see `_keywordsAgreeWithTheTable` below.
function keyword<const Word extends string>(...keywords: Word[]) {
  return { kind: 'keyword', keywords } as const;
}

const COLOR: ValueSpec = { kind: 'color' };
const LENGTH = numeric();
const LENGTH_PERCENTAGE = numeric({ percentage: true });
const SIGNED_LENGTH_PERCENTAGE = numeric({ percentage: true, negative: true });
const AUTO_SIZE = numeric({ percentage: true, keywords: ['auto'] });
const SIGNED_AUTO_SIZE = numeric({
  percentage: true,
  negative: true,
  keywords: ['auto'],
});

// The catalogue: every property and the values it accepts. The stylesheet, the validator and
// the prop bag all derive from this table. What a property is called in CSS is not in it: the
// CSS property, the presence token and the custom property are all the kebab-case spelling of
// the name, derived where they are needed, so there is nothing here to get out of step. Which
// editor section a property appears under is the editor's business — see `scrivito_ui`'s
// `design_groups`, whose table `satisfies Record<DesignPropertyName, …>` so that it cannot
// fall behind this one.
export const DESIGN_PROPERTY_SPECS = {
  // spacing (8)
  marginTop: SIGNED_LENGTH_PERCENTAGE,
  marginRight: SIGNED_AUTO_SIZE,
  marginBottom: SIGNED_LENGTH_PERCENTAGE,
  marginLeft: SIGNED_AUTO_SIZE,
  paddingTop: LENGTH_PERCENTAGE,
  paddingRight: LENGTH_PERCENTAGE,
  paddingBottom: LENGTH_PERCENTAGE,
  paddingLeft: LENGTH_PERCENTAGE,

  // visibility (1) — `display: none`, resolved in JS, see design_css.ts
  hidden: keyword('true', 'false'),

  // alignment (1)
  textAlign: keyword('left', 'center', 'right', 'justify'),

  // size (4)
  width: AUTO_SIZE,
  maxWidth: numeric({ percentage: true, keywords: ['none'] }),
  height: AUTO_SIZE,
  minHeight: AUTO_SIZE,

  // media (1)
  objectFit: keyword('fill', 'contain', 'cover', 'none', 'scale-down'),

  // text (6)
  fontSize: LENGTH_PERCENTAGE,
  fontWeight: keyword('normal', 'bold'),
  lineHeight: numeric({ percentage: true, unitless: true }),
  letterSpacing: numeric({ negative: true }),
  textTransform: keyword('none', 'uppercase', 'lowercase', 'capitalize'),
  color: COLOR,

  // decoration (18)
  backgroundColor: COLOR,

  borderTopWidth: LENGTH,
  borderTopStyle: keyword('none', 'solid', 'dashed', 'dotted'),
  borderTopColor: COLOR,
  borderRightWidth: LENGTH,
  borderRightStyle: keyword('none', 'solid', 'dashed', 'dotted'),
  borderRightColor: COLOR,
  borderBottomWidth: LENGTH,
  borderBottomStyle: keyword('none', 'solid', 'dashed', 'dotted'),
  borderBottomColor: COLOR,
  borderLeftWidth: LENGTH,
  borderLeftStyle: keyword('none', 'solid', 'dashed', 'dotted'),
  borderLeftColor: COLOR,

  borderTopLeftRadius: LENGTH_PERCENTAGE,
  borderTopRightRadius: LENGTH_PERCENTAGE,
  borderBottomRightRadius: LENGTH_PERCENTAGE,
  borderBottomLeftRadius: LENGTH_PERCENTAGE,

  opacity: numeric({ units: [], unitless: true, min: 0, max: 1 }),
} satisfies Record<DesignPropertyName, ValueSpec>;

// `satisfies` above keeps the table and `DesignProperties` listing the same properties, in
// both directions. What it cannot check is that a keyword property's declared type says the
// same as its spec — that is asserted in `design_properties_spec.ts`, because the assertion
// has to be a used value and this module has nothing to use it for.

/**
 * The spec of a property, as the contract rather than as inferred.
 */
export function valueSpecOf(name: DesignPropertyName): ValueSpec {
  return DESIGN_PROPERTY_SPECS[name];
}

export const DESIGN_PROPERTY_NAMES = Object.keys(
  DESIGN_PROPERTY_SPECS,
) as DesignPropertyName[];

export function isDesignPropertyName(name: string): name is DesignPropertyName {
  return Object.prototype.hasOwnProperty.call(DESIGN_PROPERTY_SPECS, name);
}
