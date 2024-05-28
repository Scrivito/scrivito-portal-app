import mapValues from 'lodash-es/mapValues';

import { ComparisonRange, ObjSpaceId, WidgetJson } from 'scrivito_sdk/client';
import { ArgumentError, ScrivitoError, camelCase } from 'scrivito_sdk/common';
import {
  Modification,
  failIfPerformanceConstraint,
  getWidgetModification,
} from 'scrivito_sdk/data';
import * as AttributeSerializer from 'scrivito_sdk/models/attribute_serializer';
import {
  ContentValueProvider,
  NormalizedBasicAttributeDict,
  NormalizedBasicAttributesWithUnknownValues,
  NormalizedUnknownAttributeValue,
  getContentValue,
  isWidgetAttributeValueAndType,
  isWidgetlistAttributeValueAndType,
  normalizeAttributes,
  persistWidgets,
  serializeAttributes,
} from 'scrivito_sdk/models/basic_attribute_content';
import {
  AttributeType,
  BasicAttributeValue,
} from 'scrivito_sdk/models/basic_attribute_types';
import { BasicField } from 'scrivito_sdk/models/basic_field';
import { BasicObj } from 'scrivito_sdk/models/basic_obj';
import { TypeInfo } from 'scrivito_sdk/models/type_info';
import { withBatchedUpdates } from 'scrivito_sdk/state';

export interface BasicWidgetAttributes {
  [key: string]: unknown;
}

export interface SerializedWidgetAttributes {
  [key: string]: unknown;
}

export type DidPersistCallback = (widget: BasicWidget) => void;

export class BasicWidget implements ContentValueProvider {
  static build(id: string, obj: BasicObj): BasicWidget {
    return new BasicWidget(id, obj);
  }

  static newWithSerializedAttributes(
    attributes: SerializedWidgetAttributes
  ): BasicWidget {
    const unserializedAttributes: NormalizedBasicAttributeDict = {};
    const serializedAttributes: SerializedWidgetAttributes = {};

    Object.keys(attributes).forEach((name) => {
      const value = attributes[name];

      if (name === '_obj_class') {
        unserializedAttributes._objClass = [value as string];
        return;
      }

      if (Array.isArray(value)) {
        const [type, maybeWidgetData] = value;

        if (type === 'widget') {
          const widgetData = maybeWidgetData as SerializedWidgetAttributes;
          const newWidget = BasicWidget.newWithSerializedAttributes(widgetData);
          const attrName = camelCase(name);

          unserializedAttributes[attrName] = [newWidget, ['widget']];

          return;
        }

        if (type === 'widgetlist') {
          const widgetData = maybeWidgetData as SerializedWidgetAttributes[];
          const newWidgets = widgetData.map((serializedWidget) => {
            return BasicWidget.newWithSerializedAttributes(serializedWidget);
          });

          const attrName = camelCase(name);
          unserializedAttributes[attrName] = [newWidgets, ['widgetlist']];
          return;
        }
      }

      serializedAttributes[name] = value;
    });

    return new BasicWidget(
      undefined,
      undefined,
      unserializedAttributes,
      serializedAttributes
    );
  }

  static create(attributes: BasicWidgetAttributes): BasicWidget {
    return new BasicWidget(
      undefined,
      undefined,
      normalizeAttributes(attributes)
    );
  }

  static createWithUnknownValues(
    attributes: NormalizedBasicAttributesWithUnknownValues
  ): BasicWidget {
    return new BasicWidget(undefined, undefined, attributes);
  }

  private readonly attributesToBeSaved?: AttributesToBeSaved;
  private onDidPersistCallback?: DidPersistCallback;

  constructor(
    id: undefined,
    obj: undefined,
    attributes: NormalizedBasicAttributesWithUnknownValues,
    preserializedAttributes?: SerializedWidgetAttributes
  );

  constructor(
    id: string,
    obj: BasicObj,
    attributes?: undefined,
    preserializedAttributes?: undefined
  );

  constructor(
    private _id?: string,
    private _obj?: BasicObj,
    attributesToBeSaved?: NormalizedBasicAttributesWithUnknownValues,
    private readonly preserializedAttributes?: SerializedWidgetAttributes
  ) {
    if (!_obj) {
      if (attributesToBeSaved && isAttributesToBeSaved(attributesToBeSaved)) {
        this.attributesToBeSaved = attributesToBeSaved;
      } else {
        throw new ArgumentError(
          'Please provide a widget class as the "_objClass" property.'
        );
      }
    }
  }

  id(): string {
    this.failIfNotPersisted();

    return this._id!;
  }

  objClass(): string {
    if (this.isPersisted()) {
      return this.getAttributeData('_obj_class')!;
    }

    const [objClass] = this.attributesToBeSaved!._objClass;
    return objClass;
  }

  obj(): BasicObj {
    this.failIfNotPersisted();

    return this._obj!;
  }

  objSpaceId(): ObjSpaceId {
    return this.obj().objSpaceId();
  }

  widget(id: string): BasicWidget | null {
    return this.obj().widget(id);
  }

  modification([from, to]: ComparisonRange): Modification {
    return getWidgetModification(from, to, this.obj().id(), this.id());
  }

  get<Type extends AttributeType>(
    attributeName: string,
    typeInfo: TypeInfo<Type>
  ): BasicAttributeValue<Type> {
    return getContentValue(this, attributeName, typeInfo);
  }

  container(): BasicObj | BasicWidget {
    failIfPerformanceConstraint(
      'for performance reasons, avoid this method when rendering'
    );

    const containingField = this.containingField();
    return containingField ? containingField.getContainer() : this.obj();
  }

  update(attributes: BasicWidgetAttributes): void {
    const normalizedAttributes = normalizeAttributes(attributes);

    this.updateWithUnknownValues(normalizedAttributes);
  }

  updateWithUnknownValues(
    attributes: NormalizedBasicAttributesWithUnknownValues
  ): void {
    withBatchedUpdates(() => {
      persistWidgets(this.obj(), attributes);

      const patch = AttributeSerializer.serialize(attributes);

      this.updateSelf(patch);
    });
  }

  insertBefore(widget: BasicWidget): void {
    widget.obj().insertWidget(this, { before: widget });
  }

  insertAfter(widget: BasicWidget): void {
    widget.obj().insertWidget(this, { after: widget });
  }

  delete(): void {
    this.obj().deleteWidget(this);
  }

  copy(): BasicWidget {
    if (this.isPersisted()) {
      return this.copyPersisted();
    }

    return this.copyUnpersisted();
  }

  persistInObjIfNecessary(obj: BasicObj): void {
    if (this.isPersisted()) return;

    const normalizedAttributes = this.attributesToBeSaved!;
    persistWidgets(obj, normalizedAttributes);
    const patch = {
      ...AttributeSerializer.serialize(normalizedAttributes),
      ...this.preserializedAttributes,
    };

    this._obj = obj;
    this._id = obj.generateWidgetId();

    this.updateSelf(patch);
    this.executeDidPersistCallback();
  }

  isPersisted(): boolean {
    return !!this._obj;
  }

  onDidPersist(callback: DidPersistCallback): void {
    if (this.isPersisted()) {
      throw new ScrivitoError(
        'Cannot call "onDidPersist" of an already persisted widget'
      );
    }

    this.onDidPersistCallback = callback;
  }

  // For test purpose only.
  hasOnDidPersistCallback(): boolean {
    return !!this.onDidPersistCallback;
  }

  finishSaving(): Promise<void> {
    return this.obj().finishSaving();
  }

  equals(other: unknown): boolean {
    return (
      other instanceof BasicWidget &&
      this.id() === other.id() &&
      this.obj().equals(other.obj())
    );
  }

  containingField():
    | BasicField<'widget'>
    | BasicField<'widgetlist'>
    | undefined {
    return this.obj().fieldContainingWidget(this);
  }

  toPrettyPrint(): string {
    return `[object ${this.objClass()} id="${this.id()}" objId="${this.obj().id()}"]`;
  }

  getAttributeData<Key extends keyof WidgetJson & string>(
    attributeName: Key
  ): WidgetJson[Key] | undefined {
    return this.obj().getWidgetAttribute(this.id(), attributeName);
  }

  getData(): WidgetJson {
    return this.obj().getWidgetData(this.id())!;
  }

  // For test purpose only.
  getAttributesToBeSaved(): AttributesToBeSaved | undefined {
    return this.attributesToBeSaved;
  }

  private failIfNotPersisted() {
    if (!this.isPersisted()) {
      throw new ScrivitoError(
        'Can not access a new widget before it has been saved.'
      );
    }
  }

  private updateSelf(patch: SerializedWidgetAttributes) {
    const widgetPoolPatch = { _widgetPool: [{ [this.id()]: patch }] };
    this.obj().update(widgetPoolPatch);
  }

  private executeDidPersistCallback() {
    if (this.onDidPersistCallback) {
      this.onDidPersistCallback(this);
      delete this.onDidPersistCallback;
    }
  }

  private copyPersisted() {
    const serializedAttributes = serializeAttributes(this);
    return BasicWidget.newWithSerializedAttributes(serializedAttributes);
  }

  private copyUnpersisted() {
    const copy = new BasicWidget(
      undefined,
      undefined,
      mapValues(this.attributesToBeSaved, copyNormalizedValue)
    );

    if (this.onDidPersistCallback) {
      copy.onDidPersist(this.onDidPersistCallback);
    }

    return copy;
  }
}

function copyNormalizedValue(
  valueAndType: NormalizedUnknownAttributeValue
): NormalizedUnknownAttributeValue {
  if (isWidgetAttributeValueAndType(valueAndType)) {
    const [widget, typeInfo] = valueAndType;
    return [widget.copy(), typeInfo];
  }

  if (isWidgetlistAttributeValueAndType(valueAndType)) {
    const [value, typeInfo] = valueAndType;
    const widgets = Array.isArray(value) ? value : [value];

    return [widgets.map((widget) => widget.copy()), typeInfo];
  }

  // typescript doesn't preserve "tuple-ness" for a copied tuple
  return valueAndType.slice(0) as typeof valueAndType;
}

interface AttributesToBeSaved
  extends NormalizedBasicAttributesWithUnknownValues {
  _objClass: [string];
}

function isAttributesToBeSaved(
  attributes: NormalizedBasicAttributesWithUnknownValues
): attributes is AttributesToBeSaved {
  const value = attributes._objClass;
  if (!value) return false;

  const [objClass] = value;
  return typeof objClass === 'string';
}
