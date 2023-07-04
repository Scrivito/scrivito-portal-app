import {
  BasicObj,
  ObjScope,
  ObjUnavailable,
  excludeGlobal,
} from 'scrivito_sdk/models';

export function getObjFrom(scope: ObjScope, id: string): BasicObj | null {
  const maybeObj = scope.get(id);

  return maybeObj instanceof BasicObj ? maybeObj : null;
}

export function getObjIncludingUnavailableFrom(
  scope: ObjScope,
  id: string
): BasicObj | ObjUnavailable {
  return scope.get(id);
}

/** Returns an Obj with the desired value for the given attribute.
 *
 * If multiple such Objs exist, one of them is chosen in a random, but determistic way.
 * Deleted Objs are avoided: They are only chosen, if no other matching Objs exists.
 */
export function getObjBy(
  scope: ObjScope,
  attribute: string,
  value: string
): BasicObj | null {
  const query = scope.search().and(attribute, 'equals', value);
  const foundObj = query.first();

  if (foundObj && foundObj.isDeleted()) {
    return query.excludeDeleted().first() ?? foundObj;
  }

  return foundObj;
}

export function getAllObjsByValueFrom(
  scope: ObjScope,
  attribute: string,
  value: string
): BasicObj[] {
  return scope
    .search()
    .and(attribute, 'equals', value)
    .dangerouslyUnboundedTake();
}

export function getRootObjFrom(scope: ObjScope): BasicObj | null {
  return getObjBy(scope.and(excludeGlobal), '_path', '/');
}
