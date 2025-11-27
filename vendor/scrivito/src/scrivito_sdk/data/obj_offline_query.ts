import {
  ExistentObjJson,
  Query,
  QueryResponse,
  isExistentObjJson,
} from 'scrivito_sdk/client';
import { ScrivitoError } from 'scrivito_sdk/common';
import { findInObjOfflineStore } from 'scrivito_sdk/data/obj_data';
import { QueryParams } from 'scrivito_sdk/data/obj_query_store';

export async function queryObjOfflineStore({
  query,
  offset,
  orderBy,
}: QueryParams): Promise<QueryResponse> {
  if (offset && offset > 0) throwNotSupported('offset');
  if (orderBy && orderBy.length > 0) throwNotSupported('order');

  const hits = await findInObjOfflineStore(
    (objJson) => isExistentObjJson(objJson) && isMatchForQuery(objJson, query)
  );

  return {
    results: hits.map(([_objJson, [_, id]]) => id),
    total: hits.length,
  };
}

function isMatchForQuery(objJson: ExistentObjJson, query: Query[]) {
  return query.every(({ field, operator, value, negate }) => {
    if (operator !== 'equals') throwNotSupported(`operator ${operator}`);
    if (typeof field !== 'string') throwNotSupported('multiple fields');

    const values = Array.isArray(value) ? value : [value];
    const fieldValue = computeFieldValue(objJson, field);

    const wantMatch = !negate;
    const isMatch = values.some((queryValue) => fieldValue === queryValue);

    return wantMatch === isMatch;
  });
}

function computeFieldValue(
  objJson: ExistentObjJson,
  field: string
): string | null {
  if (field === '_parent_path') {
    const path = objJson._path;

    return !path || path === '/'
      ? null
      : path.split('/').slice(0, -1).join('/') || '/';
  }

  if (isSupportedAttribute(field)) {
    let value = objJson[field];
    if (Array.isArray(value)) value = value[0];

    // converting undefined to null, so that searching for null works reliably
    // (e.g. path equals null)
    return value ?? null;
  }

  throwNotSupported(`field ${field}`);
}

/** a list of supported attributes which are
 * 1) built-in (not custom attributes)
 * 1) considered searchable (indexed in the Scrivito backend)
 * 2) represented as simple strings (in JSON)
 */
const SUPPORTED_ATTRIBUTES = {
  _id: true,
  _obj_class: true,
  _path: true,
  _site_id: true,
  _language: true,
  _content_id: true,
  _permalink: true,
  _data_param: true,
};

type SupportedAttribute = keyof typeof SUPPORTED_ATTRIBUTES;

function isSupportedAttribute(
  attribute: string
): attribute is SupportedAttribute {
  return SUPPORTED_ATTRIBUTES[attribute as SupportedAttribute] === true;
}

function throwNotSupported(description: string): never {
  throw new NotSupportedOfflineError(description);
}

export class NotSupportedOfflineError extends ScrivitoError {}
