// Validation of a design property value. The authority, not the TypeScript types: values
// arrive from the backend and from the AI, which is why the `Design` constructor runs every
// one of them through here and drops what it does not recognize.

import {
  DesignPropertyName,
  LengthUnit,
  valueSpecOf,
} from 'scrivito_sdk/models/design_properties';

const NUMERIC_PATTERN = /^(-?(?:\d+|\d*\.\d+))([a-z%]*)$/;
const COLOR_PATTERN = /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/;

/**
 * Whether `value` is a valid value for `name`.
 *
 * This is the authority — the TypeScript types in `DesignProperties` are advisory, because values arrive from
 * the backend, from `set` calls and from the AI, none of which TypeScript can vouch for.
 * An invalid value is dropped, and the rest of the design is kept (see *Validation*).
 */
export function isValidDesignPropertyValue(
  name: DesignPropertyName,
  value: unknown,
): boolean {
  if (typeof value !== 'string' || value === '') return false;

  const spec = valueSpecOf(name);

  if (spec.kind === 'keyword') return spec.keywords.includes(value);
  if (spec.kind === 'color') return COLOR_PATTERN.test(value);

  if (spec.keywords.includes(value)) return true;

  const match = NUMERIC_PATTERN.exec(value);
  if (!match) return false;

  const [, numberPart, unit] = match;
  const number = Number(numberPart);
  if (!Number.isFinite(number)) return false;
  if (!spec.negative && number < 0) return false;
  if (spec.min !== undefined && number < spec.min) return false;
  if (spec.max !== undefined && number > spec.max) return false;

  if (unit === '') return spec.unitless || number === 0;
  if (unit === '%') return spec.percentage;

  return spec.units.includes(unit as LengthUnit);
}
