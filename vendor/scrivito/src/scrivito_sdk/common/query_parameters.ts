export interface QueryParameters {
  [key: string]: string | null | Array<string | null>;
}

export function buildQueryString(params: QueryParameters): string {
  return Object.entries(params)
    .flatMap(([key, v]) =>
      (Array.isArray(v) ? v : [v]).map((value) => encodeParam(key, value))
    )
    .join('&');
}

function encodeParam(key: string, value: string | null): string {
  return value === null
    ? encodeURIComponent(key)
    : [encodeURIComponent(key), encodeURIComponent(value)].join('=');
}

export function parseQueryToQueryParameters(query: string): QueryParameters {
  const normalizedQuery = encodeBareKeys(query);
  const result: QueryParameters = {};

  for (const [encodedKey, encodedValue] of new URLSearchParams(
    normalizedQuery
  )) {
    const key = decodeParam(encodedKey);
    const value = decodeParamValue(encodedValue);

    if (key in result) {
      const existing = result[key];
      result[key] = Array.isArray(existing)
        ? [...existing, value]
        : [existing, value];
    } else result[key] = value;
  }

  return result;
}

/**
 * URLSearchParams treats bare keys (e.g. "?foo") as keys with empty values, which conflicts with "?foo=".
 * We double the "=" signs before parsing, then restore them after.
 */
function encodeBareKeys(query: string) {
  return query.replace(/=/g, '==');
}

function decodeParam(param: string) {
  return param.replace(/==/g, '=');
}

/**
 * URLSearchParams prefixes values with "=" after our encoding.
 * Remove the prefix and decode any "==" back to "=".
 */
function decodeParamValue(value: string) {
  return value ? decodeParam(value.slice(1)) : null;
}
