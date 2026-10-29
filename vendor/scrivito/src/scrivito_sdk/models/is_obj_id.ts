const OBJ_ID_PATTERN = /^[0-9a-f]{16}$/;

let strictValidation = true;

export function disableStrictObjIdValidation(): void {
  strictValidation = false;
}

export function enableStrictObjIdValidation(): void {
  strictValidation = true;
}

export function isObjId(value: unknown): value is string {
  if (typeof value !== 'string') return false;
  if (strictValidation) return OBJ_ID_PATTERN.test(value);
  return true;
}
