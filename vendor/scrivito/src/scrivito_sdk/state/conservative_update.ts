import {
  PrimitiveObject,
  PrimitiveValue,
  isPrimitiveObject,
} from 'scrivito_sdk/state/primitive_value';

// Given a primitive value `current` and a primitive value `next`,
// this method produces a result primitive value, which is
// * equal to next
// * independent from `next`
//   -> it does not reuse any Objects or Arrays from `next`
// * as identical to `current` as possible
//   -> it reuses as many Objects and Arrays of `current` as possible
//   -> but it mutates neither `current` nor `next`
// * frozen (as in Object.freeze)
//   -> Any newly created Objects and Arrays are frozen, so the result is deep-frozen,
//      assuming that all Objects and Arrays inside `current` are frozen already.
export function conservativeUpdate<T>(current: T | undefined, next: T): T {
  // this method works on the assumption that you pass in primitive data, i.e.
  // * plain Objects, not instances of classes
  // * plain Arrays, not some crazy subtypes of Array
  //
  // TS, however, cannot express that effectively,
  // therefore using `any` to turn off type check.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return updateValue(current as any, next as any) as any;
}

function updateValue<T extends PrimitiveValue>(
  current: T | undefined,
  next: T
): T {
  if (current === next) {
    // performance optimization, avoid deep comparison
    return next;
  }

  if (isPrimitiveObject(next)) {
    return updateObject(isPrimitiveObject(current) ? current : undefined, next);
  }

  if (isPrimitiveValueArray(next)) {
    return updateArray(
      isPrimitiveValueArray(current) ? current : undefined,
      next
    );
  }

  return next;
}

function isPrimitiveValueArray(
  value: PrimitiveValue
): value is PrimitiveValue[] {
  return Array.isArray(value);
}

function updateObject<T extends PrimitiveObject>(
  current: T | undefined,
  next: T
): T {
  const updated: Partial<T> = {};
  let foundDiff = false;

  if (current === undefined) {
    foundDiff = true;
  }

  const nextKeys = Object.keys(next);
  const currentKeys = new Set();

  if (current) {
    Object.keys(current).forEach((key) => currentKeys.add(key));
  }

  if (currentKeys.size !== nextKeys.length) {
    foundDiff = true;
  }

  nextKeys.forEach(<K extends keyof T>(key: K) => {
    if (!currentKeys.has(key)) {
      foundDiff = true;
    }

    const currentValue = current ? current[key] : undefined;
    const updatedValue = updateValue(currentValue, next[key]);

    if (updatedValue !== currentValue) {
      foundDiff = true;
    }

    updated[key] = updatedValue;
  });

  const result = foundDiff ? Object.freeze(updated) : current;

  // since result has every key in next, it is now T, not just Partial<T>
  // (assuming that T is a primitive Object, not some subtype of Object)
  return result as T;
}

function updateArray<T extends S[], S extends PrimitiveValue>(
  current: T | undefined,
  next: T
): T {
  let foundDiff = false;

  if (current === undefined || current.length !== next.length) {
    foundDiff = true;
  }

  const updated: S[] = next.map((nextValue, index) => {
    const currentValue = current ? current[index] : undefined;
    const updatedValue = updateValue(currentValue, nextValue);

    if (updatedValue !== currentValue) {
      foundDiff = true;
    }

    return updatedValue;
  });

  const result = foundDiff ? Object.freeze(updated) : current;

  // since result now has the same content as `next`, it is T
  // (assuming that T is a primitive Array, not some subtype of Array)
  return result as T;
}
