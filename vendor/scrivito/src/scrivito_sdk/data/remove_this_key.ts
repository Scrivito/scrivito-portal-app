export class RemoveThisKey {
  toJSON() {
    return null;
  }
}

export const REMOVE_THIS_KEY = new RemoveThisKey();

export function isRemoveThisKey<T>(v: T | RemoveThisKey): v is RemoveThisKey {
  return v === REMOVE_THIS_KEY;
}
