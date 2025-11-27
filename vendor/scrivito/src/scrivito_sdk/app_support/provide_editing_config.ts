import {
  AttributeEditingOptions,
  DataClassEditingConfig,
  EditingConfig,
  ObjEditingConfig,
  WidgetEditingConfig,
} from 'scrivito_sdk/app_support/editing_config';
import {
  getEditingConfigFor,
  setEditingConfigFor,
} from 'scrivito_sdk/app_support/editing_config_store';
import { getClassName } from 'scrivito_sdk/app_support/get_class_name';
import { DataClass, DataItem } from 'scrivito_sdk/data_integration';
import { CmsAttributeType } from 'scrivito_sdk/models';
import {
  AttributeDefinitions,
  ObjClass,
  WidgetClass,
} from 'scrivito_sdk/realm';

/** @public */
export function provideEditingConfig<
  AttrDefs extends AttributeDefinitions = AttributeDefinitions
>(
  objClass: ObjClass<AttrDefs>,
  editingConfig: ObjEditingConfig<AttrDefs>
): void;

/** @public */
export function provideEditingConfig(
  objClassName: string,
  editingConfig: ObjEditingConfig
): void;

/** @public */
export function provideEditingConfig<
  AttrDefs extends AttributeDefinitions = AttributeDefinitions
>(
  widgetClass: WidgetClass<AttrDefs>,
  editingConfig: WidgetEditingConfig<AttrDefs>
): void;

/** @public */
export function provideEditingConfig(
  dataClass: DataClass,
  editingConfig: DataClassEditingConfig
): void;

/** @public */
export function provideEditingConfig(
  dataItem: DataItem,
  editingConfig: DataClassEditingConfig
): void;

/** @public */
export function provideEditingConfig(
  widgetClassName: string,
  editingConfig: WidgetEditingConfig
): void;

/** @internal */
export function provideEditingConfig(
  subject: string | ObjClass | WidgetClass | DataClass | DataItem,
  editingConfig: EditingConfig
): void {
  setEditingConfigFor(getClassName(subject), editingConfig);
}

export function getAttributeEditingOptionsFor(
  className: string,
  attributeName: string,
  attributeType: CmsAttributeType
): AttributeEditingOptions | undefined {
  const attributes = getEditingConfigFor(className)?.attributes || {};
  const attribute = attributes[attributeName];

  if (!attribute?.options) return;
  let invalidOptions = attribute.options;

  if (attribute.editor === 'colorPicker') {
    const { allowAlpha, ...rest } = attribute.options;
    invalidOptions = rest;
  } else if (attributeType === 'html') {
    const { allowedTags, showHtmlSource, toolbar, ...rest } = attribute.options;
    invalidOptions = rest;
  } else if (attributeType === 'string') {
    const { multiLine, ...rest } = attribute.options;
    invalidOptions = rest;
  }

  if (Object.keys(invalidOptions).length === 0) return attribute.options;
}
