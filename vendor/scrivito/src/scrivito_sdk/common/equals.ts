/** Compares two values as precise as possible.
 * Please use this function if the correctness matters, but the performance does not.
 *
 * * If an object has a method `equals`, then the method `equals` is used for the comparison.
 * * If an object has a method `valueOf`, then the method `valueOf` is used for the comparison.
 * * In large arrays every single element is compared.
 * * Nested arrays are compared deep.
 * */
export function equals(a: unknown, b: unknown): boolean {
  if (a === b) return true;

  if (isObjectSupportingEquals(a) && isObjectSupportingEquals(b)) {
    return a.equals(b);
  }

  if (
    isObjectWithScrivitoPrivateContent(a) &&
    isObjectWithScrivitoPrivateContent(b)
  ) {
    return equals(a._scrivitoPrivateContent, b._scrivitoPrivateContent);
  }

  if (Array.isArray(a) && Array.isArray(b)) {
    return a.length === b.length && a.every((v, i) => equals(v, b[i]));
  }

  if (isObjectSupportingValueOf(a) && isObjectSupportingValueOf(b)) {
    return a.valueOf() === b.valueOf();
  }

  return false;
}

/** Compares two values best effort.
 * Please use this function if the performance matters, but the correctness does not.
 *
 * * If an object has a method `equals`, then the method `equals` is used for the comparison.
 * * If an object has a method `valueOf`, then the method `valueOf` is used for the comparison.
 * * Arrays with more than 3 elements are skipped and assumed not to be equal.
 * * Nested arrays with more than 3 levels of depth are skipped and assumed not to be equal.
 * */
export function equalsBestEffort(a: unknown, b: unknown): boolean {
  return equalsBestEffortWithDepthLimit(a, b);
}

function equalsBestEffortWithDepthLimit(
  a: unknown,
  b: unknown,
  currentDepth: number = 1
): boolean {
  if (a === b) return true;

  if (isObjectSupportingEquals(a) && isObjectSupportingEquals(b)) {
    return a.equals(b);
  }

  if (
    isObjectWithScrivitoPrivateContent(a) &&
    isObjectWithScrivitoPrivateContent(b)
  ) {
    return equalsBestEffortWithDepthLimit(
      a._scrivitoPrivateContent,
      b._scrivitoPrivateContent,
      currentDepth
    );
  }

  if (
    Array.isArray(a) &&
    Array.isArray(b) &&
    currentDepth <= 3 &&
    a.length <= 3 &&
    b.length <= 3 &&
    a.length === b.length
  ) {
    return a.every((v, i) =>
      equalsBestEffortWithDepthLimit(v, b[i], currentDepth + 1)
    );
  }

  if (isObjectSupportingValueOf(a) && isObjectSupportingValueOf(b)) {
    return a.valueOf() === b.valueOf();
  }

  return false;
}

interface ObjectSupportingEquals {
  equals(other: unknown): boolean;
}

function isObjectSupportingEquals(
  object: unknown
): object is ObjectSupportingEquals {
  if (!object) return false;
  return typeof (object as ObjectSupportingEquals).equals === 'function';
}

interface ObjectSupportingValueOf {
  valueOf(): string | number | boolean | undefined;
}

function isObjectSupportingValueOf(
  object: unknown
): object is ObjectSupportingValueOf {
  if (!object) return false;
  return typeof (object as ObjectSupportingValueOf).valueOf === 'function';
}

interface ObjectWithScrivitoPrivateContent {
  _scrivitoPrivateContent: ObjectSupportingEquals;
}

function isObjectWithScrivitoPrivateContent(
  object: unknown
): object is ObjectWithScrivitoPrivateContent {
  if (!object) return false;

  return (object as ObjectWithScrivitoPrivateContent).hasOwnProperty(
    '_scrivitoPrivateContent'
  );
}
