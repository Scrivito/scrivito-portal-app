export function computeCacheKey(data: unknown): string {
  const normalizedData = normalizeData(data);
  return JSON.stringify(normalizedData);
}

interface UnknownObject {
  [index: string]: unknown;
}

function normalizeData(data: unknown): unknown {
  if (Array.isArray(data)) {
    return data.map(normalizeData);
  }

  if (isUnknownObject(data)) {
    return Object.keys(data)
      .sort()
      .map((key) => [key, normalizeData(data[key])]);
  }

  return data;
}

function isUnknownObject(data: unknown): data is UnknownObject {
  return typeof data === 'object' && data !== null;
}
