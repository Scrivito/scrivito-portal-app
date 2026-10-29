import { ObjSpaceId, isObjSpaceId } from 'scrivito_sdk/client/obj_space_id';

export type ComparisonRange = [ObjSpaceId, ObjSpaceId];

export function isComparisonRange(input: unknown): input is ComparisonRange {
  if (!Array.isArray(input)) return false;
  if (input.length !== 2) return false;

  return input.every(isObjSpaceId);
}
