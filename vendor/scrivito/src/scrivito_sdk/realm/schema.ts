import { BasicField } from 'scrivito_sdk/models';
import {
  AttributeTypeWithMandatoryConfig,
  BasicTypeInfo,
  NormalizedTypeInfo,
} from 'scrivito_sdk/models/type_info';
import {
  AppClass,
  AttributeType,
  Obj,
  ObjClass,
  Widget,
  WidgetClass,
} from 'scrivito_sdk/realm';

export interface ObjClassDefinition {
  attributes?: AttributeDefinitions;
  extend?: ObjClass;
  extractTextAttributes?: readonly string[];
  name?: string;
  onlyAsRoot?: boolean;
  onlyChildren?: readonly string[] | string;
  onlyInside?: readonly string[] | string;
  validAsRoot?: boolean;
}

interface BaseObjClassDefinition {
  extractTextAttributes?: readonly string[];
  name?: string;
  onlyAsRoot?: boolean;
  onlyChildren?: readonly string[] | string;
  onlyInside?: readonly string[] | string;
  validAsRoot?: boolean;
}

export interface SimpleObjClassDefinition<Attrs extends AttributeDefinitions>
  extends BaseObjClassDefinition {
  attributes?: Attrs;
}

export interface ExtendObjClassDefinition<
  ExtendAttrs extends AttributeDefinitions
> extends BaseObjClassDefinition {
  extend?: ObjClass<ExtendAttrs>;
}

export interface MixedObjClassDefinition<
  Attrs extends AttributeDefinitions,
  ExtendAttrs extends AttributeDefinitions
> extends BaseObjClassDefinition {
  attributes?: Attrs;
  extend?: ObjClass<ExtendAttrs>;
}

export interface WidgetClassDefinition {
  attributes?: AttributeDefinitions;
  extend?: WidgetClass;
  extractTextAttributes?: readonly string[];
  name?: string;
  onlyChildren?: undefined;
  onlyInside?: readonly string[] | string;
}

interface BaseWidgetClassDefinition {
  extractTextAttributes?: readonly string[];
  name?: string;
  onlyChildren?: undefined;
  onlyInside?: readonly string[] | string;
}

export interface SimpleWidgetClassDefinition<Attrs extends AttributeDefinitions>
  extends BaseWidgetClassDefinition {
  attributes?: Attrs;
}

export interface ExtendWidgetClassDefinition<
  ExtendAttrs extends AttributeDefinitions
> extends BaseWidgetClassDefinition {
  extend?: WidgetClass<ExtendAttrs>;
}

export interface MixedWidgetClassDefinition<
  Attrs extends AttributeDefinitions,
  ExtendAttrs extends AttributeDefinitions
> extends BaseWidgetClassDefinition {
  attributes?: Attrs;
  extend?: WidgetClass<ExtendAttrs>;
}

export interface AttributeDefinitions {
  [attributeName: string]: AttributeDefinition;
}

type AttributeDefinition =
  | AttributeDefinitionWithoutConfig
  | AttributeDefinitionWithConfig;

type AttributeDefinitionWithoutConfig =
  | AttributeTypeWithoutConfig
  | AttributeTypeWithOmittedConfig;

type AttributeDefinitionWithConfig = {
  [Type in keyof AttributeTypeToConfigMapping]: readonly [
    Type,
    AttributeTypeToConfigMapping[Type]
  ];
}[keyof AttributeTypeToConfigMapping];

type AttributeTypeWithoutConfig = Exclude<
  AttributeType,
  keyof AttributeTypeToConfigMapping
>;

type AttributeTypeWithOmittedConfig = Exclude<
  AttributeType,
  AttributeTypeWithMandatoryConfig | AttributeTypeWithoutConfig
>;

type AttributeTypeToConfigMapping = {
  enum: { values: readonly string[] };
  multienum: { values: readonly string[] };
  reference: { only: string | readonly string[] };
  referencelist: { only: string | readonly string[] };
  widget: { only: string | readonly string[] };
  widgetlist:
    | { only: string | readonly string[]; maximum?: number }
    | { only?: string | readonly string[]; maximum: number };
};

export interface NormalizedAttributeDefinitions {
  [attributeName: string]: NormalizedTypeInfo<AttributeType>;
}

export interface BasicAttributeDefinitions {
  [attributeName: string]: BasicTypeInfo<AttributeType>;
}

interface BasicObjClassDefinition {
  attributes: BasicAttributeDefinitions;
  extend?: ObjClass;
  extractTextAttributes?: readonly string[];
  name?: string;
  onlyAsRoot?: boolean;
  onlyChildren?: readonly string[];
  onlyInside?: readonly string[];
  validAsRoot?: boolean;
}

interface BasicWidgetClassDefinition {
  attributes: BasicAttributeDefinitions;
  extend?: WidgetClass;
  extractTextAttributes?: readonly string[];
  name?: string;
  onlyAsRoot?: boolean;
  onlyChildren?: undefined;
  onlyInside?: readonly string[];
  validAsRoot?: boolean;
}

export type AttributeTypeOf<K extends AttributeDefinition> = K extends
  | AttributeTypeWithoutConfig
  | AttributeTypeWithOmittedConfig
  ? K
  : K[0];

export class Schema {
  static forInstance(model: Obj | Widget): Schema | undefined {
    return Schema.forClass(model.constructor as ObjClass | WidgetClass);
  }

  static forClass(klass: ObjClass | WidgetClass): Schema | undefined {
    return klass._scrivitoPrivateSchema;
  }

  static basicFieldFor<T extends AttributeType>(
    model: Obj | Widget,
    attributeName: string
  ): BasicField<T> | null {
    const schema = Schema.forInstance(model);

    if (!schema) return null;

    const typeInfo = schema.attribute(attributeName);

    if (!typeInfo) return null;

    return new BasicField<T>(
      model._scrivitoPrivateContent,
      attributeName,
      typeInfo as BasicTypeInfo<T>
    );
  }

  private readonly basicClassDefinition:
    | BasicObjClassDefinition
    | BasicWidgetClassDefinition;

  constructor(classDefinition: ObjClassDefinition, parent: ObjClass);

  constructor(classDefinition: WidgetClassDefinition, parent: WidgetClass);

  constructor(
    classDefinition: ObjClassDefinition | WidgetClassDefinition,
    readonly parentClass: ObjClass | WidgetClass
  ) {
    const parentSchema = this.parentClass._scrivitoPrivateSchema;
    const basicAttributeDefinitions: BasicAttributeDefinitions = parentSchema
      ? { ...parentSchema.attributes() }
      : {};

    const {
      attributes: rawAttributeDefinitions,
      onlyInside: rawOnlyInside,
      onlyChildren: rawOnlyChildren,
      ...restOfRawDefinition
    } = classDefinition;

    if (rawAttributeDefinitions) {
      Object.keys(rawAttributeDefinitions).forEach((name) => {
        basicAttributeDefinitions[name] = toBasicAttributeDefinition(
          rawAttributeDefinitions[name]
        );
      });
    }

    const onlyChildren = toArrayOfStrings(rawOnlyChildren);
    const onlyInside = toArrayOfStrings(rawOnlyInside);

    if (onlyChildren) {
      this.basicClassDefinition = {
        ...(restOfRawDefinition as ObjClassDefinition),
        attributes: basicAttributeDefinitions,
        onlyChildren,
        onlyInside,
      };
    } else {
      this.basicClassDefinition = {
        ...restOfRawDefinition,
        attributes: basicAttributeDefinitions,
        onlyInside,
      };
    }
  }

  attributes(): BasicAttributeDefinitions {
    return this.basicClassDefinition.attributes;
  }

  normalizedAttributes(): NormalizedAttributeDefinitions {
    const attributes = this.attributes();
    const normalizedAttributes: NormalizedAttributeDefinitions = {};

    Object.keys(attributes).forEach((name) => {
      normalizedAttributes[name] = toNormalizedAttributeDefinition(
        attributes[name]
      );
    });

    return normalizedAttributes;
  }

  extractTextAttributes(): readonly string[] {
    return this.basicClassDefinition.extractTextAttributes || [];
  }

  name(): string | undefined {
    return this.basicClassDefinition.name;
  }

  onlyInside(): readonly string[] | undefined {
    return this.basicClassDefinition.onlyInside;
  }

  onlyChildren(): readonly string[] | undefined {
    return this.basicClassDefinition.onlyChildren;
  }

  validAsRoot(): boolean | undefined {
    return this.basicClassDefinition.validAsRoot;
  }

  onlyAsRoot(): boolean | undefined {
    return this.basicClassDefinition.onlyAsRoot;
  }

  attribute(name: string): BasicTypeInfo<AttributeType> | undefined {
    return this.attributes()[name];
  }

  isBinary() {
    const blobDefinition = this.attribute('blob');
    if (!blobDefinition) return false;

    return blobDefinition[0] === 'binary';
  }

  parent(): WidgetClass | ObjClass {
    return this.parentClass;
  }
}

export function isAppClass(object: object): object is AppClass {
  return !!(object && (object as AppClass)._scrivitoPrivateSchema);
}

function toBasicAttributeDefinition(
  attrDefinition: AttributeDefinition
): BasicTypeInfo<AttributeType> {
  if (typeof attrDefinition === 'string') return [attrDefinition];

  const type = attrDefinition[0];

  if (type === 'enum' || type === 'multienum') return [type, attrDefinition[1]];

  const { only, ...otherOptions } = attrDefinition[1];
  const validClasses = typeof only === 'string' ? [only] : only;

  if (type === 'widgetlist' && !validClasses && attrDefinition[1].maximum) {
    return ['widgetlist', { maximum: attrDefinition[1].maximum }];
  }

  return validClasses ? [type, { ...otherOptions, validClasses }] : [type];
}

function toNormalizedAttributeDefinition(
  definition: BasicTypeInfo<AttributeType>
): NormalizedTypeInfo<AttributeType> {
  if (definition.length === 1) return [definition[0], {}];

  switch (definition[0]) {
    case 'reference':
    case 'referencelist':
    case 'widget':
    case 'widgetlist': {
      const { validClasses: only, ...otherConfig } = definition[1];
      return [definition[0], only ? { only, ...otherConfig } : otherConfig];
    }
  }

  return definition;
}

function toArrayOfStrings(value: string | readonly string[] | undefined) {
  if (typeof value === 'string') return [value];

  if (value?.length) return value;
}
