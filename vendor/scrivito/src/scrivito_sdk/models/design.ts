import {
  DESIGN_BREAKPOINTS,
  DesignBreakpoint,
  isDesignBreakpoint,
} from 'scrivito_sdk/models/design_breakpoint';
import {
  DESIGN_PROPERTY_NAMES,
  DesignProperties,
  DesignPropertyName,
  isDesignPropertyName,
} from 'scrivito_sdk/models/design_properties';
import { isValidDesignPropertyValue } from 'scrivito_sdk/models/design_values';

/** The JSON shape a `design` attribute is stored as. */
/** @public */
export type DesignPojo = {
  [breakpoint in DesignBreakpoint]?: DesignProperties;
};

/**
 * What `set` accepts: the same properties, but each of them may also be `undefined` or `null`
 * to remove it from the breakpoint.
 */
export type DesignPropertyUpdate = {
  [Name in DesignPropertyName]?: DesignProperties[Name] | null;
};

/**
 * The value of a `design` attribute: a set of CSS-ish properties per breakpoint, where
 * `tablet` and `mobile` hold only the properties that differ from `desktop`.
 *
 * Instances are immutable.
 *
 * @public
 */
export class Design {
  private readonly properties: DesignPojo;

  /** @internal */
  constructor(pojo?: DesignPojo | null) {
    this.properties = normalizeDesignPojo(pojo);
  }

  /**
   * The value that applies at `breakpoint` — what actually renders: its own, or the one it
   * derives from. Use `getOwn` to tell "same as desktop" from "explicitly set here".
   *
   * @internal
   */
  get<Name extends DesignPropertyName>(
    name: Name,
    breakpoint: DesignBreakpoint = 'desktop',
  ): DesignProperties[Name] {
    // Its own value, else the base's. On `desktop` the two are the same lookup, so the base
    // needs no special case.
    return this.getOwn(name, breakpoint) ?? this.getOwn(name, 'desktop');
  }

  /**
   * The value stored at exactly `breakpoint`, without falling back. Telling "set here" from
   * "inherited" is the editor's business; an app renders what applies.
   *
   * @internal
   */
  getOwn<Name extends DesignPropertyName>(
    name: Name,
    breakpoint: DesignBreakpoint = 'desktop',
  ): DesignProperties[Name] {
    return this.properties[breakpoint]?.[name];
  }

  /**
   * The properties stored at exactly `breakpoint`, without falling back.
   *
   * @internal
   */
  ownProperties(breakpoint: DesignBreakpoint = 'desktop'): DesignProperties {
    return { ...this.properties[breakpoint] };
  }

  /**
   * A copy with `properties` merged into `breakpoint`. A key present with the value
   * `undefined` (or `null`) removes the property from that breakpoint.
   *
   * @internal
   */
  set(
    properties: DesignPropertyUpdate,
    breakpoint: DesignBreakpoint = 'desktop',
  ): Design {
    const merged = { ...this.properties[breakpoint] };

    for (const name of Object.keys(properties)) {
      if (!isDesignPropertyName(name)) continue;

      const value = properties[name];
      if (value === undefined || value === null) {
        delete merged[name];
      } else {
        // TypeScript cannot correlate `name` with the value type it selects, so the write has
        // to go through `Object.assign`. `normalizeDesignPojo` re-checks it anyway.
        Object.assign(merged, { [name]: value });
      }
    }

    return new Design({ ...this.properties, [breakpoint]: merged });
  }

  /**
   * A copy with every property removed from `breakpoint`.
   *
   * @internal
   */
  clear(breakpoint: DesignBreakpoint = 'desktop'): Design {
    return new Design({ ...this.properties, [breakpoint]: {} });
  }

  /** @internal */
  isEmpty(): boolean {
    return DESIGN_BREAKPOINTS.every(
      (breakpoint) => !this.properties[breakpoint],
    );
  }

  /** @internal */
  toPojo(): DesignPojo {
    return structuredCloneOfPojo(this.properties);
  }

  /** @internal */
  equals(other: Design): boolean {
    return toJson(this.properties) === toJson(other.properties);
  }
}

export const EMPTY_DESIGN = new Design();

/** Parses the backend string. Anything unparsable yields an empty `Design`. */
export function parseDesign(json: string): Design {
  if (json === '') return EMPTY_DESIGN;

  let parsed: unknown;

  try {
    parsed = JSON.parse(json);
  } catch {
    return EMPTY_DESIGN;
  }

  // The one cast in this file, and the safe kind: the constructor validates every breakpoint
  // and every property before keeping any of it.
  return new Design(isObject(parsed) ? (parsed as DesignPojo) : null);
}

/** Serializes to the backend string. An empty `Design` becomes the empty string. */
export function serializeDesign(design: Design): string {
  return design.isEmpty() ? '' : toJson(design.toPojo());
}

// Drops everything the property table does not recognize, and keeps the rest. That is the
// whole of forwards compatibility: a newer UI may write properties this SDK has never heard
// of, and reading them must not discard the ones it does know.
function normalizeDesignPojo(pojo: DesignPojo | null | undefined): DesignPojo {
  if (!isObject(pojo)) return {};

  const normalized: DesignPojo = {};

  for (const breakpoint of Object.keys(pojo)) {
    if (!isDesignBreakpoint(breakpoint)) continue;

    const properties = pojo[breakpoint];
    if (!isObject(properties)) continue;

    const normalizedProperties: DesignProperties = {};
    let hasProperty = false;

    for (const name of Object.keys(properties)) {
      if (!isDesignPropertyName(name)) continue;

      const value = properties[name];
      if (!isValidDesignPropertyValue(name, value)) continue;

      // Written through `Object.assign` because TypeScript cannot correlate `name` with the
      // value type it selects — `isValidDesignPropertyValue` has just done that check.
      Object.assign(normalizedProperties, { [name]: value });
      hasProperty = true;
    }

    if (hasProperty) normalized[breakpoint] = normalizedProperties;
  }

  return normalized;
}

function structuredCloneOfPojo(pojo: DesignPojo): DesignPojo {
  const clone: DesignPojo = {};

  for (const breakpoint of DESIGN_BREAKPOINTS) {
    const properties = pojo[breakpoint];
    if (properties) clone[breakpoint] = { ...properties };
  }

  return clone;
}

// Property-table order throughout, so that two equal designs serialize to equal strings and
// a diff of the stored JSON stays readable.
function toJson(pojo: DesignPojo): string {
  const ordered: DesignPojo = {};

  for (const breakpoint of DESIGN_BREAKPOINTS) {
    const properties = pojo[breakpoint];
    if (!properties) continue;

    const orderedProperties: DesignProperties = {};

    for (const name of DESIGN_PROPERTY_NAMES) {
      const value = properties[name];

      if (value !== undefined) {
        Object.assign(orderedProperties, { [name]: value });
      }
    }

    ordered[breakpoint] = orderedProperties;
  }

  return JSON.stringify(ordered);
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
