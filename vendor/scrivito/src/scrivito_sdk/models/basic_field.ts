import {
  ComparisonRange,
  FieldDiff,
  HtmlDiffContent,
  ObjSpaceId,
} from 'scrivito_sdk/client';
import { getFieldDiff } from 'scrivito_sdk/data';
import { getContentValue } from 'scrivito_sdk/models/basic_attribute_content';
import {
  AttributeType,
  BasicAttributeValue,
  BasicAttributeValueForUpdate,
} from 'scrivito_sdk/models/basic_attribute_types';
import { BasicObj } from 'scrivito_sdk/models/basic_obj';
import { getObjFrom } from 'scrivito_sdk/models/basic_scope_get_methods';
import { BasicWidget } from 'scrivito_sdk/models/basic_widget';
import { ObjScope } from 'scrivito_sdk/models/obj_scope';
import { objSpaceScopeExcludingDeleted } from 'scrivito_sdk/models/obj_space_scope_excluding_deleted';
import { BasicTypeInfo } from 'scrivito_sdk/models/type_info';

export class BasicField<Type extends AttributeType> {
  private readonly widgetId?: string;

  constructor(
    private readonly container: BasicObj | BasicWidget,
    private readonly attributeName: string,
    private readonly typeInfo: BasicTypeInfo<Type>
  ) {
    if (container instanceof BasicWidget) this.widgetId = container.id();
  }

  get(): BasicAttributeValue<Type> {
    return getContentValue(this.container, this.attributeName, this.typeInfo);
  }

  update(newValue: BasicAttributeValueForUpdate<Type>): void {
    this.container.update({ [this.attributeName]: [newValue, this.typeInfo] });
  }

  getContainer(): BasicObj | BasicWidget {
    return this.container;
  }

  obj(): BasicObj {
    return this.container.obj();
  }

  objSpaceId(): ObjSpaceId {
    return this.container.objSpaceId();
  }

  name(): string {
    return this.attributeName;
  }

  maximum(): number | undefined {
    const options:
      | {
          validClasses?: readonly string[];
          values?: readonly string[];
          maximum?: number;
        }
      | undefined = this.typeInfo[1];

    return options?.maximum;
  }

  type(): Type {
    return this.typeInfo[0] as Type;
  }

  equals(other: unknown) {
    if (!(other instanceof BasicField)) {
      return false;
    }

    return (
      this.container.equals(other.getContainer()) &&
      this.attributeName === other.name()
    );
  }

  validClasses(): readonly string[] | undefined {
    const options:
      | {
          validClasses?: readonly string[];
          values?: readonly string[];
        }
      | undefined = this.typeInfo[1];
    return options?.validClasses;
  }

  getDiff([from, to]: ComparisonRange): FieldDiff | null {
    const obj = this.obj();
    return getFieldDiff(from, to, this.attributeName, obj.id(), this.widgetId);
  }

  getHtmlDiffContent(range: ComparisonRange): HtmlDiffContent | null {
    const diff = this.getDiff(range);
    return diff?.format === 'html' ? diff.content : null;
  }

  toString(): string {
    const objId = this.obj().id();
    const name = this.name();

    return this.widgetId
      ? `<BasicField name=${name} objId=${objId} widgetId=${this.widgetId}>`
      : `<BasicField name=${name} objId=${objId}>`;
  }

  id(): string {
    return this.widgetId
      ? `${this.attributeName}|${this.obj().id()}|${this.widgetId}`
      : `${this.attributeName}|${this.obj().id()}`;
  }

  inObjSpace(objSpaceId: ObjSpaceId): BasicField<Type> | null {
    return this.inObjScope(objSpaceScopeExcludingDeleted(objSpaceId));
  }

  inObjScope(scope: ObjScope): BasicField<Type> | null {
    const obj = getObjFrom(scope, this.obj().id());
    if (!obj) return null;

    const container =
      this.getContainer() instanceof BasicObj
        ? obj
        : obj.widget(this.getContainer().id());
    if (!container) return null;

    return new BasicField<Type>(container, this.name(), this.typeInfo);
  }
}
