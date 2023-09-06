import { CustomAttributeJsonMapping } from 'scrivito_sdk/client';

let autoConvert = false;

export function enableAutoConvertAttributes(): void {
  autoConvert = true;
}

// For test purposes only
export function resetAutoConvertAttributes(): void {
  autoConvert = false;
}

export function autoConvertToReference(value: unknown): unknown {
  if (!autoConvert) return value;

  const singleValue = autoConvertToSingle(value);
  if (backendValueType(singleValue) !== 'link') return singleValue;

  const objId = (singleValue as CustomAttributeJsonMapping['link'])[1].obj_id;
  if (!objId) return singleValue;

  const result: CustomAttributeJsonMapping['reference'] = ['reference', objId];
  return result;
}

export function autoConvertToReferencelist(value: unknown): unknown {
  if (!autoConvert) return value;

  const listValue = autoConvertToList(value);
  if (backendValueType(listValue) !== 'linklist') return listValue;

  const objId = (listValue as CustomAttributeJsonMapping['linklist'])[1][0]
    ?.obj_id;
  if (!objId) return listValue;

  const result: CustomAttributeJsonMapping['referencelist'] = [
    'referencelist',
    [objId],
  ];
  return result;
}

export function autoConvertToLink(value: unknown): unknown {
  if (!autoConvert) return value;

  const singleValue = autoConvertToSingle(value);
  if (backendValueType(singleValue) !== 'reference') return singleValue;

  const result: CustomAttributeJsonMapping['link'] = [
    'link',
    linkForReference(
      (singleValue as CustomAttributeJsonMapping['reference'])[1]
    ),
  ];
  return result;
}

export function autoConvertToLinklist(value: unknown): unknown {
  if (!autoConvert) return value;

  const listValue = autoConvertToList(value);
  if (backendValueType(listValue) !== 'referencelist') return listValue;

  const result: CustomAttributeJsonMapping['linklist'] = [
    'linklist',
    [
      linkForReference(
        (listValue as CustomAttributeJsonMapping['referencelist'])[1][0]
      ),
    ],
  ];
  return result;
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
  const type = autoConvert && backendValueType(value);

  if (type === 'html') {
    return ['string', (value as CustomAttributeJsonMapping['html'])[1]];
  }

  if (type === 'number') {
    return [
      'string',
      (value as CustomAttributeJsonMapping['number'])[1].toString(),
    ];
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
  number: 'stringlist',
  reference: 'referencelist',
  string: 'stringlist',
};

type ValidSingleType = keyof typeof LIST_TYPE_FOR;

export function autoConvertToList(value: unknown): unknown {
  const type = autoConvert && backendValueType(value);
  const targetType = type && LIST_TYPE_FOR[type as ValidSingleType];
  if (!targetType) return value;

  const singleValue = (value as CustomAttributeJsonMapping[ValidSingleType])[1];

  if (type === 'number') return [targetType, [singleValue.toString()]];

  return singleValue ? [targetType, [singleValue]] : value;
}

type BackendType = keyof CustomAttributeJsonMapping;

function backendValueType(value: unknown): BackendType | undefined {
  return Array.isArray(value) ? (value[0] as BackendType) : undefined;
}
