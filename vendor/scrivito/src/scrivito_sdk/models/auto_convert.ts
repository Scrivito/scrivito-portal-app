import {
  CustomAttributeJsonMapping,
  HtmlAttributeJson,
  LinkAttributeJson,
  LinklistAttributeJson,
  ReferenceAttributeJson,
  ReferencelistAttributeJson,
} from 'scrivito_sdk/client';
import { onReset } from 'scrivito_sdk/common';

let autoConvertAttributes = false;

export function setWantsAutoAttributeConversion(value: boolean): void {
  autoConvertAttributes = value;
}

export function wantsAutoAttributeConversion(): boolean {
  return !!autoConvertAttributes;
}

export function autoConvertToReference(value: unknown): unknown {
  if (!wantsAutoAttributeConversion()) return value;

  const singleValue = autoConvertToSingle(value);
  if (backendValueType(singleValue) !== 'link') return singleValue;

  const objId = (singleValue as LinkAttributeJson)[1].obj_id;
  if (!objId) return singleValue;

  return ['reference', objId];
}

export function autoConvertToReferencelist(value: unknown): unknown {
  if (!wantsAutoAttributeConversion()) return value;

  const listValue = autoConvertToList(value);
  if (backendValueType(listValue) !== 'linklist') return listValue;

  const objIds = (listValue as LinklistAttributeJson)[1]
    .map(({ obj_id }) => obj_id)
    .filter((id) => !!id);

  return ['referencelist', objIds];
}

export function autoConvertToLink(value: unknown): unknown {
  if (!wantsAutoAttributeConversion()) return value;

  const singleValue = autoConvertToSingle(value);
  if (backendValueType(singleValue) !== 'reference') return singleValue;

  return ['link', linkForReference((singleValue as ReferenceAttributeJson)[1])];
}

export function autoConvertToLinklist(value: unknown): unknown {
  if (!wantsAutoAttributeConversion()) return value;

  const listValue = autoConvertToList(value);
  if (backendValueType(listValue) !== 'referencelist') return listValue;

  return [
    'linklist',
    (listValue as ReferencelistAttributeJson)[1].map(linkForReference),
  ];
}

function linkForReference(objId: string) {
  return {
    fragment: null,
    obj_id: objId,
    query: null,
    target: null,
    title: null,
    url: null,
  };
}

const SINGLE_TYPE_FOR = {
  linklist: 'link',
  referencelist: 'reference',
  stringlist: 'string',
};

type ValidListType = keyof typeof SINGLE_TYPE_FOR;

export function autoConvertToSingle(value: unknown): unknown {
  const type = wantsAutoAttributeConversion() && backendValueType(value);

  if (type === 'html') {
    return ['string', (value as HtmlAttributeJson)[1]];
  }

  const targetType = type && SINGLE_TYPE_FOR[type as ValidListType];
  if (!targetType) return value;

  /** Valid cast: a present `targetType` implies a `ValidListType` */
  const listValue = (value as CustomAttributeJsonMapping[ValidListType])[1];
  return listValue.length ? [targetType, listValue[0]] : value;
}

const LIST_TYPE_FOR = {
  html: 'stringlist',
  link: 'linklist',
  reference: 'referencelist',
  string: 'stringlist',
};

type ValidSingleType = keyof typeof LIST_TYPE_FOR;

export function autoConvertToList(value: unknown): unknown {
  const type = wantsAutoAttributeConversion() && backendValueType(value);
  const targetType = type && LIST_TYPE_FOR[type as ValidSingleType];
  if (!targetType) return value;

  const singleValue = (value as CustomAttributeJsonMapping[ValidSingleType])[1];
  return singleValue ? [targetType, [singleValue]] : value;
}

type BackendType = keyof CustomAttributeJsonMapping;

function backendValueType(value: unknown): BackendType | undefined {
  return Array.isArray(value) ? (value[0] as BackendType) : undefined;
}

onReset(() => (autoConvertAttributes = false));
