import * as React from 'react';
import { ValidationsConfig } from 'scrivito_sdk/app_support/validations_config';
import { Binary } from 'scrivito_sdk/models';
import {
  AttributeDefinitions,
  AttributeValue,
  Obj,
  Widget,
} from 'scrivito_sdk/realm';

/** @public */
export type ObjEditingConfig<
  AttrDefs extends AttributeDefinitions = AttributeDefinitions
> = SharedEditingConfig<Obj<AttrDefs>> & ObjOnlyEditingConfig<AttrDefs>;

/** @public */
export type ObjEditingConfigAttributes =
  Required<ObjEditingConfig>['attributes'];

/** @public */
export type ObjEditingConfigInitialContent =
  Required<ObjEditingConfig>['initialContent'];

/** @public */
export type ObjEditingConfigValidations =
  Required<ObjEditingConfig>['validations'];

/** @public */
export type WidgetEditingConfig<
  AttrDefs extends AttributeDefinitions = AttributeDefinitions
> = SharedEditingConfig<Widget<AttrDefs>>;

/** @public */
export type WidgetEditingConfigAttributes =
  Required<WidgetEditingConfig>['attributes'];

/** @public */
export type WidgetEditingConfigInitialContent =
  Required<WidgetEditingConfig>['initialContent'];

/** @public */
export type WidgetEditingConfigValidations =
  Required<WidgetEditingConfig>['validations'];

/** @public */
export interface DataClassEditingConfig {
  title?: string;
  attributes?: AttributesEditingConfig;
}

export type EditingConfig = DataClassEditingConfig &
  SharedEditingConfig<Obj | Widget> &
  ObjOnlyEditingConfig;

type AttributeValueFunction = () => AttributeValue;

export interface LocalizedValue {
  value: string;
  title: string;
}

interface AttributeDataContextConfig {
  [cmsAttributeName: string]: ContextDescription | DataLocatorAttributeName;
}

type DataLocatorAttributeName = string;

export interface ContextDescription {
  [contextAttributeName: string]: ContextAttributeDescription;
}

type ContextAttributeDescription = string;

export interface AttributesEditingConfig {
  [attributeName: string]: AttributeEditingConfig;
}

export type AttributeEditor = 'colorPicker';

export type AttributeEditingConfig = {
  title?: string;
  description?: string;
  restrictDataTo?: RestrictDataTo;
  values?: readonly LocalizedValue[];
  iteratesOver?: IteratesOver;
  editor?: AttributeEditor;
} & EditorSpecificAttributeEditingConfig;

type EditorSpecificAttributeEditingConfig =
  | {
      editor: 'colorPicker';
      options?: ColorPickerEditorAttributeEditingOptions;
    }
  | {
      editor?: never;
      options?: HtmlAttributeEditingOptions & StringAttributeEditingOptions;
    };

export type RestrictDataTo = Array<
  'scope' | 'item' | 'scopeAttribute' | 'itemAttribute'
>;

export type IteratesOver = 'data';

export type AttributeEditingOptions = HtmlAttributeEditingOptions &
  StringAttributeEditingOptions &
  ColorPickerEditorAttributeEditingOptions;

interface HtmlAttributeEditingOptions {
  allowedTags?: readonly (keyof React.JSX.IntrinsicElements)[];
  showHtmlSource?: boolean;
  toolbar?: readonly ToolbarButton[];
}

interface StringAttributeEditingOptions {
  multiLine?: boolean;
}

interface ColorPickerEditorAttributeEditingOptions {
  allowAlpha?: boolean;
}

export interface LivingComponentGroupDescription {
  title: string;
  component: ExtensionComponent;
  key: string;
  enabled?: boolean;
}

export type ComponentGroupDescription =
  | LivingComponentGroupDescription
  | RegisteredComponentGroupDescription;

export interface PropertiesGroupDescription {
  title: string;
  properties: readonly GroupProperty[];
  key?: string;
  enabled?: boolean;
}

export interface DynamicComponentGroupDescription {
  title: string;
  component: string | ExtensionComponent | null;
  key: string;
  properties?: readonly GroupProperty[];
  enabled?: boolean;
}

export interface DynamicPropertiesGroupDescription
  extends PropertiesGroupDescription {
  key: string;
}

export type DynamicPropertyGroup =
  | DynamicPropertiesGroupDescription
  | DynamicComponentGroupDescription;

export type PropertyGroup =
  | ComponentGroupDescription
  | PropertiesGroupDescription
  | DynamicPropertyGroup;

export type GroupPropertyWithConfig = readonly [string, { enabled: boolean }];

export type GroupPropertyWithComponent = readonly [
  string,
  { component: ExtensionComponent | null }
];

export type GroupProperty =
  | GroupPropertyWithConfig
  | GroupPropertyWithComponent
  | string;

export interface RegisteredComponentGroupDescription {
  title: string;
  component: string;
  properties?: readonly GroupProperty[];
  enabled?: boolean;
  // the "key" is optional because of backward compatibility reasons
  key?: string;
}

type ToolbarButton =
  | 'abbr'
  | 'blockquote'
  | 'bold'
  | 'bulletList'
  | 'clean'
  | 'code'
  | 'codeBlock'
  | 'header1'
  | 'header2'
  | 'header3'
  | 'header4'
  | 'header5'
  | 'header6'
  | 'indent'
  | 'italic'
  | 'link'
  | 'mark'
  | 'orderedList'
  | 'outdent'
  | 'strikethrough'
  | 'subscript'
  | 'superscript'
  | 'underline';

// This covers loadable components as well, see
// https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/loadable__component/index.d.ts
type ExtensionComponent =
  | React.ComponentType<{ obj: Obj }>
  | React.ComponentType<{ page: Obj }>
  | React.ComponentType<{ widget: Widget }>
  | React.ComponentType<{ obj: Obj } | { page: Obj } | { widget: Widget }>;

interface InitialContent {
  [attributeName: string]: AttributeValue | AttributeValueFunction;
}

type InitializeCallback<T extends Obj | Widget> = (instance: T) => void;

type PropertiesGroupsCallback<T extends Obj | Widget> = (
  content: T
) => readonly DynamicPropertyGroup[];

type PropertiesCallback<T extends Obj | Widget> = (
  content: T
) => readonly GroupProperty[];

type ForContentCallback<T extends Obj | Widget> = (content: T) => string;

interface SharedEditingConfig<T extends Obj | Widget> {
  attributes?: AttributesEditingConfig;
  description?: string;
  hideInSelectionDialogs?: boolean;
  initialContent?: InitialContent;
  initializeCopy?: InitializeCallback<T>;
  properties?: readonly GroupProperty[] | PropertiesCallback<T>;
  propertiesGroups?: readonly PropertyGroup[] | PropertiesGroupsCallback<T>;
  thumbnail?: string;
  title?: string;
  initialize?: InitializeCallback<T>;
  titleForContent?: ForContentCallback<T>;
  validations?: ValidationsConfig<T>;
  attributeDataContext?: AttributeDataContextConfig;
}

interface ObjOnlyEditingConfig<
  AttrDefs extends AttributeDefinitions = AttributeDefinitions
> {
  descriptionForContent?: ForContentCallback<Obj<AttrDefs>>;
  thumbnailForContent?: (
    content: Obj<AttrDefs>
  ) => Obj | Binary | undefined | null;
}
