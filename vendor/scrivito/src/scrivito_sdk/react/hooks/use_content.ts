import { currentSiteId } from 'scrivito_sdk/app_support/current_page';
import { getDetailsPageAndQuery } from 'scrivito_sdk/app_support/get_details_page_url';
import { hasComponent } from 'scrivito_sdk/app_support/has_component';
import { InternalError, logError } from 'scrivito_sdk/common';
import {
  DataItem,
  DataItemAttribute,
  DataScope,
  DataStack,
  applyDataLocator,
} from 'scrivito_sdk/data_integration';
import {
  BasicLink,
  BasicObj,
  BasicTypeInfo,
  BasicWidget,
  CmsAttributeType,
  getContentValueOrConnection,
  isContentConnection,
} from 'scrivito_sdk/models';
import { useDataStackOrThrow } from 'scrivito_sdk/react/data_context_container';
import {
  AttributeDefinitions,
  AttributeValueOf,
  Obj,
  Schema,
  Widget,
  unwrapAppClass,
  wrapInAppClass,
} from 'scrivito_sdk/realm';

/** @public */
export function useContent<A extends keyof AttributeDefinitions & string>(
  content: Obj | Widget,
  attributeName: string
): AttributeValueOf<AttributeDefinitions, A> {
  return resolveContent(content, attributeName, useDataStackOrThrow());
}

// Exported for test purpose only
export function resolveContent(
  content: Obj | Widget,
  attributeName: string,
  dataStack: DataStack
): ReturnType<typeof useContent> {
  const typeInfo = getTypeInfo(content, attributeName);
  if (!typeInfo) return null;

  return wrapInAppClass(
    resolveBasicContent(
      unwrapAppClass(content),
      attributeName,
      typeInfo,
      dataStack
    )
  );
}

function resolveBasicContent<T extends CmsAttributeType>(
  basicContent: BasicObj | BasicWidget,
  attributeName: string,
  typeInfo: BasicTypeInfo<T>,
  dataStack: DataStack
) {
  const valueOrConnection = getContentValueOrConnection(
    basicContent,
    attributeName,
    typeInfo
  );

  if (isContentConnection(valueOrConnection)) {
    return scopeToBasicValue(
      applyDataLocator(dataStack, valueOrConnection[1]),
      typeInfo
    );
  }

  return valueOrConnection[1];
}

function scopeToBasicValue<T extends CmsAttributeType>(
  dataScope: DataScope,
  typeInfo: BasicTypeInfo<T>
) {
  const dataAttribute = dataScope.dataItemAttribute();
  if (dataAttribute) return attributeToBasicValue(dataAttribute, typeInfo);

  const [attributeType] = typeInfo;
  const dataItem = dataScope.dataItem();
  if (dataItem) return itemToBasicValue(dataItem, attributeType);

  return toDefaultValue(attributeType);
}

function attributeToBasicValue<T extends CmsAttributeType>(
  dataAttribute: DataItemAttribute,
  typeInfo: BasicTypeInfo<T>
) {
  const obj = dataAttribute.dataItem().obj();

  if (obj) {
    return objAttributeToBasicValue(
      obj,
      dataAttribute.attributeName(),
      typeInfo
    );
  }

  throw new InternalError('Not yet implemented');
}

function itemToBasicValue<T extends CmsAttributeType>(
  dataItem: DataItem,
  attributeType: T
) {
  switch (attributeType) {
    case 'reference':
      return itemToReference(dataItem);
    case 'referencelist':
      return toList(itemToReference(dataItem));
    case 'link':
      return itemToLink(dataItem);
    case 'linklist':
      return toList(itemToLink(dataItem));
    default:
      return null;
  }
}

function itemToReference(dataItem: DataItem) {
  return unwrapAppClass(dataItem.obj()) || null;
}

function itemToLink(dataItem: DataItem) {
  const obj = dataItem.obj();
  let link: BasicLink | null = null;

  if (obj && (hasComponent(obj.objClass()) || obj.isBinary())) {
    link = new BasicLink({ objId: obj.id() });
  }

  const detailsPageAndQuery = getDetailsPageAndQuery(dataItem, currentSiteId());

  if (detailsPageAndQuery) {
    const { detailsPage, query } = detailsPageAndQuery;
    link = new BasicLink({ objId: detailsPage.id(), query });
  }

  return link;
}

function toList<T>(value: T | null): [T] | [] {
  return value === null ? [] : [value];
}

function objAttributeToBasicValue<T extends CmsAttributeType>(
  obj: Obj,
  attributeName: string,
  typeInfo: BasicTypeInfo<T>
) {
  const basicObj = unwrapAppClass(obj);

  if (getTypeInfo(obj, attributeName)?.[0] === 'datalocator') {
    logError('Connecting a "datalocator" attribute is not possible');
    return null;
  }

  return basicObj.get(attributeName, typeInfo);
}

function toDefaultValue<T extends CmsAttributeType>(attributeType: T) {
  switch (attributeType) {
    case 'linklist':
    case 'referencelist':
      return [];
    default:
      return null;
  }
}

function getTypeInfo(content: Obj | Widget, attributeName: string) {
  return Schema.forInstance(content)?.attributes()[attributeName];
}
