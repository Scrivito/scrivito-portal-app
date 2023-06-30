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
export type WidgetEditingConfig<
  AttrDefs extends AttributeDefinitions = AttributeDefinitions
> = SharedEditingConfig<Widget<AttrDefs>>;

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

export interface AttributeEditingConfig {
  title?: string;
  description?: string;
  values?: readonly LocalizedValue[];
  options?: AttributeEditingOptions;
}

export interface AttributeEditingOptions {
  allowedTags?: readonly (keyof JSX.IntrinsicElements)[];
  showHtmlSource?: boolean;
  toolbar?: readonly ToolbarButton[];
}

export interface LivingComponentGroupDescription {
  title: string;
  component: PropertiesGroupComponent;
  key: string;
  enabled?: boolean;
}

export type ComponentGroupDescription =
  | LivingComponentGroupDescriptionForUi
  | RegisteredComponentGroupDescription;

export interface PropertiesGroupDescription {
  title: string;
  properties: readonly GroupProperty[];
  key?: string;
  enabled?: boolean;
}

export interface DynamicComponentGroupDescription {
  title: string;
  component: string | PropertiesGroupComponent | null;
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
export type GroupProperty = GroupPropertyWithConfig | string;

export interface RegisteredComponentGroupDescription {
  title: string;
  component: string;
  properties?: readonly string[];
  enabled?: boolean;
  // the "key" is optional because of backward compatibility reasons
  key?: string;
}

type ToolbarButton =
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
type PropertiesGroupComponent = React.ComponentType<
  | {
      obj: Obj;
    }
  | { page: Obj }
  | { widget: Widget }
>;

interface InitialContent {
  [attributeName: string]: AttributeValue | AttributeValueFunction;
}

type InitializeCallback<T extends Obj | Widget> = (instance: T) => void;

interface LivingComponentGroupDescriptionForUi {
  title: string;
  component: null;
  key: string;
  enabled?: boolean;
}

type PropertiesGroupsCallback<T extends Obj | Widget> = (
  content: T
) => readonly PropertyGroup[];

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
  properties?: readonly string[] | PropertiesCallback<T>;
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
