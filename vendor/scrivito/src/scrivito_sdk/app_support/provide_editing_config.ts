import { uniq } from 'underscore';

import {
  AttributeEditingOptions,
  DataClassEditingConfig,
  EditingConfig,
  ObjEditingConfig,
  PropertyGroup,
  WidgetEditingConfig,
} from 'scrivito_sdk/app_support/editing_config';
import {
  getEditingConfigFor,
  setEditingConfigFor,
} from 'scrivito_sdk/app_support/editing_config_store';
import { getClassName } from 'scrivito_sdk/app_support/get_class_name';
import { ValidationsConfigType } from 'scrivito_sdk/app_support/validations_config';
import { checkArgumentsFor, nextTick, tcomb as t } from 'scrivito_sdk/common';
import {
  DataClass,
  DataItem,
  isValidDataIdentifier,
} from 'scrivito_sdk/data_integration';
import { AttributeType, LinkType, WidgetType } from 'scrivito_sdk/models';
import {
  AttributeDefinitions,
  ObjClass,
  ObjClassType,
  WidgetClass,
  WidgetClassType,
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
  editingConfig: EditingConfig,
  ...excessArgs: never[]
): void {
  checkProvideEditingConfig(subject, editingConfig, ...excessArgs);
  setEditingConfigFor(getClassName(subject), editingConfig);
}

export function getAttributeEditingOptionsFor(
  className: string,
  attributeName: string,
  attributeType: AttributeType
): AttributeEditingOptions | undefined {
  const attributes = getEditingConfigFor(className)?.attributes || {};
  const attribute = attributes[attributeName];
  const options = attribute ? attribute.options : undefined;

  if (!options) return;
  if (attributeType === 'html') return options;
  nextTick(() => throwInvalidOptions(options));
}

const { checkProvideEditingConfig, throwInvalidOptions } = (() => {
  if (process.env.NODE_ENV !== 'development') {
    return {
      checkProvideEditingConfig: () => {},
      throwInvalidOptions: () => {},
    };
  }

  const EnumValueLocalizationType = t.interface({
    value: t.String,
    title: t.String,
  });

  const HtmlToolbarButtonType = t.enums.of([
    'blockquote',
    'bold',
    'bulletList',
    'clean',
    'code',
    'codeBlock',
    'header1',
    'header2',
    'header3',
    'header4',
    'header5',
    'header6',
    'indent',
    'italic',
    'link',
    'mark',
    'orderedList',
    'outdent',
    'strikethrough',
    'subscript',
    'superscript',
    'underline',
  ]);

  const PropertiesGroupDescriptionType = t.interface({
    title: t.String,
    properties: t.list(t.String),
    enabled: t.maybe(t.Boolean),
    key: t.maybe(t.String),
  });

  const RegisteredComponentGroupDescriptionType = t.interface({
    title: t.String,
    component: t.String,
    properties: t.maybe(t.list(t.String)),
    enabled: t.maybe(t.Boolean),
    key: t.maybe(t.String),
  });

  const LivingComponentGroupDescriptionType = t.interface({
    title: t.String,
    component: t.union([t.Function, t.Object]),
    properties: t.maybe(t.list(t.String)),
    enabled: t.maybe(t.Boolean),
    key: t.String,
  });

  const ComponentGroupDescriptionType = t.union([
    RegisteredComponentGroupDescriptionType,
    LivingComponentGroupDescriptionType,
  ]);

  const PropertiesGroupType = t.union([
    PropertiesGroupDescriptionType,
    ComponentGroupDescriptionType,
  ]);

  const HtmlToolbarButtonsType = t.refinement(
    t.list(HtmlToolbarButtonType),
    (list) => list.length > 0,
    'NonemptyArray'
  );

  const AttributeDataContextConfigKeyType = t.refinement(
    t.String,
    isValidDataIdentifier,
    'DataIdentifier'
  );

  const AttributeDataContextConfigType = t.dict(
    t.String,
    t.union([t.dict(AttributeDataContextConfigKeyType, t.String), t.String])
  );

  const AttributesEditingConfigType = t.dict(
    t.String,
    t.interface({
      title: t.maybe(t.String),
      description: t.maybe(t.String),
      values: t.maybe(t.list(EnumValueLocalizationType)),
      options: t.maybe(
        t.interface({
          allowedTags: t.maybe(t.list(t.String)),
          toolbar: t.maybe(HtmlToolbarButtonsType),
          showHtmlSource: t.maybe(t.Boolean),
        })
      ),
    })
  );

  const PropertiesGroupsType = t.refinement(
    t.list(PropertiesGroupType),
    haveGroupsUniqueKey,
    'Unique key as a group identifier for faster rendering (like keys in React do)'
  );

  const InitialContentType = t.dict(
    t.String,
    t.union([
      LinkType,
      t.Boolean,
      t.Date,
      t.Function,
      t.Nil,
      t.Number,
      t.String,
      t.list(LinkType),
      WidgetType,
      t.list(WidgetType),
      t.list(t.String),
    ])
  );

  const DataClassType = t.refinement(t.Object, isDataClass, 'DataClass');

  function isDataClass(maybeDataClass: object): maybeDataClass is DataClass {
    return maybeDataClass instanceof DataClass;
  }

  const DataItemType = t.refinement(t.Object, isDataItem, 'DataItem');

  function isDataItem(maybeDataItem: object): maybeDataItem is DataItem {
    return maybeDataItem instanceof DataItem;
  }

  const EditingConfigType = t.interface({
    attributeDataContext: t.maybe(AttributeDataContextConfigType),
    attributes: t.maybe(AttributesEditingConfigType),
    description: t.maybe(t.String),
    descriptionForContent: t.maybe(t.Function),
    hideInSelectionDialogs: t.maybe(t.Boolean),
    initialContent: t.maybe(InitialContentType),
    initialize: t.maybe(t.Function),
    initializeCopy: t.maybe(t.Function),
    properties: t.maybe(t.union([t.list(t.String), t.Function])),
    propertiesGroups: t.maybe(t.union([PropertiesGroupsType, t.Function])),
    thumbnail: t.maybe(t.String),
    thumbnailForContent: t.maybe(t.Function),
    title: t.maybe(t.String),
    titleForContent: t.maybe(t.Function),
    validations: t.maybe(ValidationsConfigType),
  });

  const docPermalink = 'js-sdk/provideEditingConfig';

  return {
    checkProvideEditingConfig: checkArgumentsFor(
      'provideEditingConfig',
      [
        [
          'subject',
          t.union([
            t.String,
            ObjClassType,
            WidgetClassType,
            DataClassType,
            DataItemType,
          ]),
        ],
        ['editingConfig', EditingConfigType],
      ],
      { docPermalink }
    ),

    throwInvalidOptions: checkArgumentsFor(
      'provideEditingConfig',
      [['options', t.struct({})]],
      { docPermalink }
    ),
  };
})();

function haveGroupsUniqueKey(groups: PropertyGroup[]) {
  const groupsWithKey = groups.filter((group) => !!group.key);
  return uniq(groupsWithKey, 'key').length === groupsWithKey.length;
}
