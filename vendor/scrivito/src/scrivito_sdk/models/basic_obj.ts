import {
  AttributeJson,
  ExistentObjJson,
  ObjJson,
  ObjSpaceId,
  WidgetJson,
  WidgetPoolJson,
  isWidgetlistAttributeJson,
} from 'scrivito_sdk/client';
import {
  InternalError,
  ScrivitoError,
  camelCase,
  computeAncestorPaths,
  equals,
  isSystemAttribute,
  parseStringToDate,
  randomHex,
  randomId,
} from 'scrivito_sdk/common';
import {
  ObjData,
  WidgetPlacement,
  findWidgetPlacement,
  isUsingInMemoryTenant,
} from 'scrivito_sdk/data';
import {
  finishLinkResolutionFor,
  startLinkResolutionFor,
} from 'scrivito_sdk/link_resolution';
import * as AttributeSerializer from 'scrivito_sdk/models/attribute_serializer';
import {
  ContentValueProvider,
  NormalizedBasicAttributesWithUnknownValues,
  getContentValue,
  normalizeAttributes,
  normalizedRestriction,
  persistWidgets,
  serializeAttributes,
} from 'scrivito_sdk/models/basic_attribute_content';
import {
  AttributeType,
  BasicAttributeValue,
} from 'scrivito_sdk/models/basic_attribute_types';
import { BasicField } from 'scrivito_sdk/models/basic_field';
import {
  BasicObjSearch,
  BasicSearchValue,
  FieldBoost,
  SearchField,
  SearchOperator,
} from 'scrivito_sdk/models/basic_obj_search';
import { createObjIn } from 'scrivito_sdk/models/basic_scope_create_methods';
import {
  getAllObjsByValueFrom,
  getObjBy,
  getObjFrom,
} from 'scrivito_sdk/models/basic_scope_get_methods';
import { BasicWidget } from 'scrivito_sdk/models/basic_widget';
import { Binary } from 'scrivito_sdk/models/binary';
import { computeParentPath } from 'scrivito_sdk/models/compute_parent_path';
import { convertToSlug } from 'scrivito_sdk/models/convert_to_slug';
import {
  currentObjSpaceId,
  currentWorkspaceId,
  isCurrentWorkspacePublished,
} from 'scrivito_sdk/models/current_workspace_id';
import { MetadataCollection } from 'scrivito_sdk/models/metadata_collection';
import { objSpaceScope } from 'scrivito_sdk/models/obj_scope';
import { objSpaceScopeExcludingDeleted } from 'scrivito_sdk/models/obj_space_scope_excluding_deleted';
import { restrictToSite } from 'scrivito_sdk/models/restrict_to_site';
import { TypeInfo } from 'scrivito_sdk/models/type_info';
import { withBatchedUpdates } from 'scrivito_sdk/state';

interface WidgetInsertionBefore {
  before: BasicWidget;
}

type WidgetInsertionAnchor =
  | WidgetInsertionBefore
  | { after: BasicWidget; before?: undefined };

interface WidgetPlacementWithContainer extends WidgetPlacement {
  container: BasicObj | BasicWidget;
  attributeValue:
    | BasicAttributeValue<'widget'>
    | BasicAttributeValue<'widgetlist'>;
}

export interface BasicObjAttributes {
  [key: string]: unknown;
  _id?: string | [string];
  _objClass?: string | [string];
  _path?: string | [string] | null;
}

export interface SerializedObjAttributes {
  [key: string]: unknown;
  _id: string;
  _obj_class: string;
  _restriction?: [string] | null;
  _language?: string | null;
  _data_param?: [string] | null;
}

export class BasicObj implements ContentValueProvider {
  static get(id: string): BasicObj | null {
    return getObjFrom(currentObjSpaceWithoutDeleted(), id);
  }

  static getIncludingDeleted(id: string): BasicObj | null {
    return getObjFrom(objSpaceScope(currentObjSpaceId()), id);
  }

  // Accessible for test purposes only (otherwise better inlined)
  static createInObjSpace(
    objSpaceId: ObjSpaceId,
    attributes: BasicObjAttributes
  ): BasicObj {
    return createObjIn(objSpaceScope(objSpaceId), attributes);
  }

  static generateId(): string {
    return randomId();
  }

  static all(): BasicObjSearch {
    return new BasicObjSearch(currentObjSpaceId()).batchSize(1000);
  }

  static where(
    fields: SearchField,
    operator: SearchOperator,
    value: BasicSearchValue,
    boost?: FieldBoost
  ): BasicObjSearch {
    return new BasicObjSearch(currentObjSpaceId()).and(
      fields,
      operator,
      value,
      boost
    );
  }

  static getByPermalink(permalink: string): BasicObj | null {
    return getObjBy(currentObjSpaceWithoutDeleted(), '_permalink', permalink);
  }

  static getAllByPermalink(permalink: string): BasicObj[] {
    return getAllObjsByValueFrom(
      currentObjSpaceWithoutDeleted(),
      '_permalink',
      permalink
    );
  }

  // For test purpose only.
  static generateWidgetId(): string {
    return randomHex();
  }

  readonly objData: ObjData;

  constructor(objData: ObjData) {
    this.objData = objData;
  }

  id(): string {
    return this.objData.id();
  }

  objClass(): string {
    return this.getAttributeData('_obj_class');
  }

  obj(): this {
    return this;
  }

  createdAt(): Date | null {
    return parseStringToDate(this.getAttributeData('_created_at'));
  }

  createdBy(): string | null {
    return this.getAttributeData('_created_by') || null;
  }

  lastChanged(): Date | null {
    const data = this.getAttributeData('_last_changed');

    if (!data) return null;

    return parseStringToDate(data);
  }

  lastChangedBy(): string | null {
    return this.getAttributeData('_last_changed_by') || null;
  }

  firstPublishedAt(): Date | null {
    return parseStringToDate(this.getAttributeData('_first_published_at'));
  }

  publishedAt(): Date | null {
    return parseStringToDate(this.getAttributeData('_published_at'));
  }

  firstPublishedBy(): string | null {
    return this.getAttributeData('_first_published_by') || null;
  }

  publishedBy(): string | null {
    return this.getAttributeData('_published_by') || null;
  }

  objSpaceId(): ObjSpaceId {
    return this.objData.objSpaceId();
  }

  version(): string | undefined {
    return this.getAttributeData('_version');
  }

  path(): string | null {
    return this.getAttributeData('_path') || null;
  }

  permalink(): string | null {
    return this.getAttributeData('_permalink') || null;
  }

  siteId(): string | null {
    return this.getAttributeData('_site_id') ?? null;
  }

  language(): string | null {
    return this.getAttributeData('_language') ?? null;
  }

  parentPath(): string | null {
    return computeParentPath(this.path());
  }

  parent(): BasicObj | null {
    const parentPath = this.parentPath();
    const siteId = this.siteId();
    if (parentPath === null || siteId === null) return null;

    return getObjByPath(this.objSpaceId(), siteId, parentPath);
  }

  hasConflicts(): boolean {
    return !!this.getAttributeData('_conflicts');
  }

  modification(): 'new' | 'edited' | 'deleted' | null {
    if (
      this.objData.isUnavailable() ||
      this.getAttributeData('_marked_deleted')
    ) {
      return 'deleted';
    }

    return this.getAttributeData('_modification') || null;
  }

  dataClass(): string | null {
    return this.get('dataClass', 'string') || null;
  }

  dataParam(): [string] | null {
    return this.getAttributeData('_data_param') ?? null;
  }

  get<Type extends AttributeType>(
    attributeName: string,
    typeInfo: TypeInfo<Type>
  ): BasicAttributeValue<Type> {
    return getContentValue(this, attributeName, typeInfo);
  }

  isModified(): boolean {
    return !!this.modification();
  }

  isNew(): boolean {
    return this.modification() === 'new';
  }

  isEdited(): boolean {
    return this.modification() === 'edited';
  }

  isEditingAsset(): boolean {
    return this.getAttributeData('_editing_asset') === true;
  }

  isDeleted(): boolean {
    return this.modification() === 'deleted';
  }

  contentLength(): number {
    return this.metadata().contentLength();
  }

  contentType(): string {
    return this.metadata().contentType();
  }

  contentUrl(): string {
    return this.blob()?.url() || '';
  }

  contentId(): string {
    return this.getAttributeData('_content_id') || this.id();
  }

  metadata(): MetadataCollection {
    const blob = this.blob();
    return blob
      ? new MetadataCollection(blob.id(), this.objSpaceId())
      : new MetadataCollection();
  }

  children(): BasicObj[] {
    const search = this.getChildrenSearch();
    return search ? search.dangerouslyUnboundedTake() : [];
  }

  hasChildren(): boolean {
    const search = this.getChildrenSearch();
    return search ? search.batchSize(0).count() > 0 : false;
  }

  orderedChildren(): BasicObj[] {
    const children = this.children();
    if (children.length === 0) return [];

    const childOrder = this.get('childOrder', 'referencelist');
    const idsOrder = childOrder.map((reference) => reference.id());

    return children
      .map((child: BasicObj): [number, BasicObj] => {
        const index = idsOrder.indexOf(child.id());
        return [index === -1 ? children.length : index, child];
      })
      .sort(([a], [b]) => a - b)
      .map(([, child]) => child);
  }

  backlinks(): BasicObj[] {
    return objSpaceScopeExcludingDeleted(this.objSpaceId())
      .search()
      .and('*', 'linksTo', this)
      .dangerouslyUnboundedTake();
  }

  ancestors(): Array<BasicObj | null> {
    const parentPath = this.parentPath();
    const siteId = this.siteId();
    if (parentPath === null || siteId === null) return [];

    return computeAncestorPaths(parentPath).map((ancestorPath) =>
      getObjByPath(this.objSpaceId(), siteId, ancestorPath)
    );
  }

  restriction(): string {
    const restrictionAttribute = this.getAttributeData('_restriction');
    return normalizedRestriction(restrictionAttribute);
  }

  restrict(restriction: string = '_auth'): void {
    this.update({
      _restriction: restriction === '_public' ? null : [[restriction]],
    });
  }

  unrestrict(): void {
    this.restrict('_public');
  }

  isRestricted(): boolean {
    return this.restriction() !== '_public';
  }

  update(attributes: BasicObjAttributes): void {
    const normalizedAttributes = normalizeAttributes(attributes);

    this.updateWithUnknownValues(normalizedAttributes);
  }

  updateWithUnknownValues(
    attributes: NormalizedBasicAttributesWithUnknownValues
  ): void {
    if (isCurrentWorkspacePublished() && !isUsingInMemoryTenant()) {
      throw new ScrivitoError('The published content cannot be modified.');
    }

    withBatchedUpdates(() => {
      persistWidgets(this, attributes);

      const patch = AttributeSerializer.serialize(attributes);

      this.objData.update(patch);
    });

    this.startLinkResolution();
  }

  delete(): void {
    this.update({ _markedDeleted: [true] });
  }

  insertWidget(widget: BasicWidget, anchor: WidgetInsertionAnchor): void {
    const id = widgetIdFromWidgetInsertionAnchor(anchor);
    const placement = this.widgetPlacementFor(id);

    if (placement) {
      const { attributeValue, attributeName, container, index } = placement;
      if (!Array.isArray(attributeValue)) throw new InternalError();

      const newIndex = anchor.before ? index : index + 1;
      const newAttributeValue = [
        ...attributeValue.slice(0, newIndex),
        widget,
        ...attributeValue.slice(newIndex),
      ];

      container.update({
        [attributeName]: [newAttributeValue, ['widgetlist']],
      });
    }
  }

  deleteWidget(widget: BasicWidget): void {
    const widgetOrWidgetlistField = this.fieldContainingWidget(widget);
    if (!widgetOrWidgetlistField) return;

    if (widgetOrWidgetlistField.type() === 'widgetlist') {
      const widgetlistField =
        widgetOrWidgetlistField as BasicField<'widgetlist'>;

      const value = widgetlistField.get();
      const newValue = value.filter((curWidget) => !curWidget.equals(widget));

      widgetlistField.update(newValue);
    } else {
      const widgetField = widgetOrWidgetlistField as BasicField<'widget'>;
      widgetField.update(null);
    }
  }

  siblingWidget(
    widget: BasicWidget,
    indexOffset: -1 | 1
  ): BasicWidget | undefined {
    const placement = this.widgetPlacementFor(widget.id());

    if (placement) {
      const { attributeValue, index } = placement;

      if (Array.isArray(attributeValue)) {
        return attributeValue[index + indexOffset];
      }
    }
  }

  markResolvedAsync(): Promise<void> {
    this.update({ _conflicts: [null] });

    return this.finishSaving();
  }

  finishSaving(): Promise<void> {
    return this.finishLinkResolution().then(() => this.objData.finishSaving());
  }

  equals(other: unknown): boolean {
    return (
      other instanceof BasicObj &&
      this.id() === other.id() &&
      equals(this.objSpaceId(), other.objSpaceId())
    );
  }

  widget(id: string): BasicWidget | null {
    if (!this.getWidgetAttribute(id, '_obj_class')) return null;

    return BasicWidget.build(id, this);
  }

  getWidgetAttribute<Key extends keyof WidgetJson & string>(
    id: string,
    attributeName: Key
  ): WidgetJson[Key] {
    return this.objData.getWidgetAttribute(id, attributeName);
  }

  widgets(): BasicWidget[] {
    const data = this.objData.getIfExistent();

    if (!data) return [];

    const widgetPool = data._widget_pool;

    if (!widgetPool) return [];

    const widgets: BasicWidget[] = [];
    const visitedWidgetIds: { [key: string]: true | undefined } = {};
    this.collectWidgets(widgets, data, widgetPool, visitedWidgetIds);

    return widgets;
  }

  widgetClassNamesWithBadPerformance(): string[] {
    const widgetPool = this.objData.getWidgetPoolWithBadPerformance();
    if (!widgetPool) return [];

    const classNames = new Set(
      Object.values(widgetPool)
        .filter((value): value is WidgetJson => !!value)
        .map((widgetJson) => widgetJson._obj_class)
    );

    return Array.from(classNames);
  }

  fieldContainingWidget(
    widget: BasicWidget
  ): BasicField<'widget'> | BasicField<'widgetlist'> | undefined {
    const widgetId = widget.id();
    const placement = this.widgetPlacementFor(widgetId);

    if (placement) {
      const { container, attributeName, attributeValue } = placement;

      return Array.isArray(attributeValue)
        ? new BasicField<'widgetlist'>(container, attributeName, ['widgetlist'])
        : new BasicField<'widget'>(container, attributeName, ['widget']);
    }
  }

  generateWidgetId(): string {
    for (let i = 0; i < 10; i++) {
      const id = BasicObj.generateWidgetId();

      if (!this.widget(id)) return id;
    }

    // Could not generate a new unused widget id.
    // (winning the lottery 5 times in a row is more likely)
    throw new InternalError();
  }

  serializeAttributes(): SerializedObjAttributes {
    const {
      _conflicts,
      _modification,
      _created_at,
      _created_by,
      _last_changed,
      _last_changed_by,
      ...serializedAttributes
    } = serializeAttributes(this);
    return serializedAttributes;
  }

  slug(): string {
    const title = this.get('title', 'string');
    return convertToSlug(title);
  }

  getWidgetData(id: string): WidgetJson | undefined {
    return this.objData.getWidget(id);
  }

  startLinkResolution(): void {
    if (!isUsingInMemoryTenant()) {
      startLinkResolutionFor(currentWorkspaceId(), this.id());
    }
  }

  finishLinkResolution(): Promise<void> {
    return finishLinkResolutionFor(currentWorkspaceId(), this.id());
  }

  toPrettyPrint(): string {
    return `[object ${this.objClass()} id="${this.id()}"]`;
  }

  getAttributeData<Key extends keyof ExistentObjJson & string>(
    attributeName: Key,
    type?: AttributeType
  ): ExistentObjJson[Key] {
    return type === 'widget' || type === 'widgetlist'
      ? this.objData.getAttributeWithWidgetData(attributeName)
      : this.objData.getAttributeWithoutWidgetData(attributeName);
  }

  getData(): ObjJson | undefined | null {
    return this.objData.get();
  }

  private blob(): Binary | null {
    return this.get('blob', ['binary']);
  }

  private collectWidgets(
    memo: BasicWidget[],
    objOrWidgetData: ExistentObjJson | WidgetJson,
    widgetPool: WidgetPoolJson,
    visitedWidgetIds: { [key: string]: true | undefined }
  ): void {
    Object.keys(objOrWidgetData)
      .map((attributeName) => {
        const attrDictValue = objOrWidgetData[attributeName];

        if (!attrDictValue) return;

        if (isSystemAttribute(attributeName)) return;

        // Typescript cannot know that once blank and system attribute entries
        // are excluded, what's left must be a custom attribute entry, and the
        // cast is therefore safe.
        const attributeJson = attrDictValue as AttributeJson;

        if (isWidgetlistAttributeJson(attributeJson)) return attributeJson[1];
      })
      .forEach((widgetIds) => {
        if (widgetIds) {
          widgetIds.forEach((widgetId) => {
            if (visitedWidgetIds[widgetId]) return;

            visitedWidgetIds[widgetId] = true;

            const widget = this.widget(widgetId);

            if (!widget) return;

            memo.push(widget);
            const widgetData = widgetPool[widgetId]!;
            this.collectWidgets(memo, widgetData, widgetPool, visitedWidgetIds);
          });
        }
      });
  }

  private widgetPlacementFor(
    widgetId: string
  ): WidgetPlacementWithContainer | undefined {
    const data = this.objData.getIfExistent();
    if (!data) return;

    const placement = findWidgetPlacement(data, widgetId);
    if (!placement) return;

    const attributeName = camelCase(placement.attributeName);
    const { attributeType, index, parentWidgetId } = placement;

    let container;

    if (parentWidgetId) {
      container = this.widget(parentWidgetId);
      if (!container) return;
    } else {
      container = this;
    }

    return {
      container,
      attributeName,
      attributeType,
      attributeValue: container.get(attributeName, [attributeType]),
      index,
      parentWidgetId,
    };
  }

  private getChildrenSearch() {
    const path = this.path();
    const siteId = this.siteId();
    if (!path || siteId === null) return;

    return hierarchyObjSpace(this.objSpaceId(), siteId)
      .search()
      .and('_parentPath', 'equals', path);
  }
}

function widgetIdFromWidgetInsertionAnchor(anchor: WidgetInsertionAnchor) {
  if (isWidgetInsertionBefore(anchor)) return anchor.before.id();

  return anchor.after.id();
}

function isWidgetInsertionBefore(
  anchor: WidgetInsertionAnchor
): anchor is WidgetInsertionBefore {
  return !!(anchor as WidgetInsertionBefore).before;
}

function currentObjSpaceWithoutDeleted() {
  return objSpaceScopeExcludingDeleted(currentObjSpaceId());
}

function getObjByPath(objSpaceId: ObjSpaceId, siteId: string, path: string) {
  return getObjBy(hierarchyObjSpace(objSpaceId, siteId), '_path', path);
}

function hierarchyObjSpace(objSpaceId: ObjSpaceId, siteId: string) {
  return objSpaceScopeExcludingDeleted(objSpaceId).and(restrictToSite(siteId));
}
