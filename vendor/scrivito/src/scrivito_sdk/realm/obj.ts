import { checkArgumentsFor, tcomb as t } from 'scrivito_sdk/common';
import { Modification } from 'scrivito_sdk/data';
import {
  BasicObj,
  FieldBoost,
  FullTextSearchOperator,
  MetadataCollection,
  ScopeTransformation,
  SearchField,
  SearchOperator,
  allSitesAndGlobal,
  copyObjViaHandler,
  currentObjSpaceId,
  emptyScope,
  objSpaceScope,
  restrictToSiteAndGlobal,
  updateReferences,
  versionOnSite,
  versionsOnAllSites,
} from 'scrivito_sdk/models';
import { AttributeDefinitions, ObjSearch, Widget } from 'scrivito_sdk/realm';
import {
  readAppAttribute,
  updateAppAttributes,
} from 'scrivito_sdk/realm/app_model_accessor';
import { assertValidAttributeName } from 'scrivito_sdk/realm/assert_valid_attribute_name';
import { AttrDict } from 'scrivito_sdk/realm/attribute_types';
import {
  BasicSiteContext,
  SiteContext,
} from 'scrivito_sdk/realm/basic_site_context';
import { currentSiteId } from 'scrivito_sdk/realm/current_site_id';
import {
  SearchValue,
  checkFullTextSearchOperator,
  checkNonFullTextSearchOperator,
} from 'scrivito_sdk/realm/obj_search';
import {
  NormalizedAttributeDefinitions,
  Schema,
} from 'scrivito_sdk/realm/schema';
import { areStrictSearchOperatorsEnabled } from 'scrivito_sdk/realm/strict_search_operators';
import { subWidgets } from 'scrivito_sdk/realm/sub_widgets';
import {
  AttributeValueOf,
  wrapInAppClass,
} from 'scrivito_sdk/realm/wrap_in_app_class';

type ObjSystemAttributes = {
  _contentId?: string;
  _id?: string;
  _language?: string | null;
  _path?: string | null;
  _permalink?: string | null;
  _siteId?: string | null;

  /** @internal */
  _restriction?: [string] | null;

  /** @internal */
  _modification?: string | null;

  /** @internal */
  _dataParam?: [string] | null;
};

export type ObjAttributes<AttrDefs extends AttributeDefinitions> =
  ObjSystemAttributes & AttrDict<AttrDefs>;
type ObjUpdateAttributes<AttrDefs extends AttributeDefinitions> = Omit<
  ObjAttributes<AttrDefs>,
  '_id'
>;

type ReferenceMapping = (refId: string) => string | undefined;

export interface ObjClass<
  AttrDefs extends AttributeDefinitions = AttributeDefinitions
> {
  /** @internal */
  readonly _scrivitoPrivateSchema?: Schema;

  /** bogus constructor, to let TypeScript understand that this is a class. */
  new (dontUseThis: { dontUseThis: never }): Obj<AttrDefs>;

  get(id: string): Obj<AttrDefs> | null;

  /** @internal */
  getIncludingDeleted(id: string): Obj<AttrDefs> | null;

  getByPath(path: string): Obj<AttrDefs> | null;

  getByPermalink(permalink: string): Obj<AttrDefs> | null;

  all(): ObjSearch<AttrDefs>;

  root(): Obj<AttrDefs> | null;

  where(
    attribute: SearchField,
    operator: SearchOperator,
    value: SearchValue,
    boost?: FieldBoost
  ): ObjSearch<AttrDefs>;

  whereFullTextOf(
    attribute: SearchField,
    operator: FullTextSearchOperator,
    value: SearchValue,
    boost?: FieldBoost
  ): ObjSearch<AttrDefs>;

  create(attributes?: ObjAttributes<AttrDefs>): Obj<AttrDefs>;

  createFromFile(
    file: File,
    attributes?: ObjAttributes<AttrDefs>
  ): Promise<Obj<AttrDefs>>;

  onAllSites(): SiteContext<AttrDefs>;

  onSite(siteId: string): SiteContext<AttrDefs>;
}

function currentSiteContext(objClass: ObjClass) {
  const siteId = currentSiteId();
  if (!siteId) return new BasicSiteContext(objClass, emptyScope());

  return getBasicSiteContext(objClass, restrictToSiteAndGlobal(siteId));
}

function getSiteContext(
  objClass: ObjClass,
  transformation: ScopeTransformation
) {
  return getBasicSiteContext(objClass, transformation).toSiteContext();
}

function getBasicSiteContext(
  objClass: ObjClass,
  transformation: ScopeTransformation
) {
  const scope = objSpaceScope(currentObjSpaceId()).and(transformation);

  return new BasicSiteContext(objClass, scope);
}

/** @public */
export class Obj<AttrDefs extends AttributeDefinitions = AttributeDefinitions> {
  /** @internal */
  readonly _scrivitoPrivateContent!: BasicObj;

  /** @internal */
  static readonly _scrivitoPrivateSchema?: Schema;

  static get(id: string): Obj | null {
    return currentSiteContext(this).get(id);
  }

  /** @internal */
  static getIncludingDeleted(id: string): Obj | null {
    return currentSiteContext(this).getIncludingDeleted(id);
  }

  static getByPath(path: string): Obj | null {
    return currentSiteContext(this).getByPath(path);
  }

  static getByPermalink(permalink: string): Obj | null {
    return currentSiteContext(this).getByPermalink(permalink);
  }

  static all(): ObjSearch {
    return currentSiteContext(this).all();
  }

  static root(): Obj | null {
    return currentSiteContext(this).root();
  }

  static where(
    attribute: SearchField,
    operator: SearchOperator,
    value: SearchValue,
    boost?: FieldBoost
  ): ObjSearch {
    if (areStrictSearchOperatorsEnabled()) {
      checkNonFullTextSearchOperator('Obj.where', operator, 'js-sdk/Obj-where');
    }

    return currentSiteContext(this).where(attribute, operator, value, boost);
  }

  static whereFullTextOf(
    attribute: SearchField,
    operator: FullTextSearchOperator,
    value: SearchValue,
    boost?: FieldBoost
  ): ObjSearch {
    checkFullTextSearchOperator(
      'Obj.whereFullTextOf',
      operator,
      'js-sdk/Obj-whereFullTextOf'
    );

    return currentSiteContext(this).whereFullTextOf(
      attribute,
      operator,
      value,
      boost
    );
  }

  static create(
    attributes?: Partial<ObjAttributes<AttributeDefinitions>>
  ): Obj {
    return currentSiteContext(this).create(attributes);
  }

  static createFromFile(
    file: File,
    attributes?: Partial<ObjAttributes<AttributeDefinitions>>
  ): Promise<Obj> {
    return currentSiteContext(this).createFromFile(file, attributes);
  }

  static onAllSites(): SiteContext {
    return getSiteContext(this, allSitesAndGlobal);
  }

  static onSite(siteId: string): SiteContext {
    checkObjOnSite(siteId);
    return getSiteContext(this, restrictToSiteAndGlobal(siteId));
  }

  id(): string {
    return this._scrivitoPrivateContent.id();
  }

  objClass(): string {
    return this._scrivitoPrivateContent.objClass();
  }

  get<AttributeName extends keyof AttrDefs & string>(
    attributeName: AttributeName
  ): AttributeValueOf<AttrDefs, AttributeName> {
    assertValidAttributeName(attributeName);

    return readAppAttribute(this, attributeName)!;
  }

  update(attributes: ObjUpdateAttributes<AttrDefs>): void {
    updateAppAttributes(this, attributes);
  }

  versionsOnAllSites(): Obj[] {
    return wrapInAppClass(versionsOnAllSites(this._scrivitoPrivateContent));
  }

  versionOnSite(siteId: string): Obj | null {
    checkVersionOnSite(siteId);

    return wrapInAppClass(versionOnSite(this._scrivitoPrivateContent, siteId));
  }

  createdAt(): Date | null {
    return this._scrivitoPrivateContent.createdAt();
  }

  firstPublishedAt(): Date | null {
    return this._scrivitoPrivateContent.firstPublishedAt();
  }

  publishedAt(): Date | null {
    return this._scrivitoPrivateContent.publishedAt();
  }

  lastChanged(): Date | null {
    return this._scrivitoPrivateContent.lastChanged();
  }

  path(): string | null {
    return this._scrivitoPrivateContent.path();
  }

  parent(): Obj | null {
    return wrapInAppClass(this._scrivitoPrivateContent.parent());
  }

  ancestors(): Array<Obj | null> {
    return this._scrivitoPrivateContent
      .ancestors()
      .map((maybeObj) => wrapInAppClass(maybeObj));
  }

  /**
   * Resolves when all previous updates have been persisted.
   * If an update fails the promise is rejected.
   */
  finishSaving(): Promise<void> {
    return this._scrivitoPrivateContent.finishSaving();
  }

  modification(): Modification {
    return this._scrivitoPrivateContent.modification();
  }

  backlinks(): Obj[] {
    return wrapInAppClass(this._scrivitoPrivateContent.backlinks());
  }

  children(): Obj[] {
    return wrapInAppClass(this._scrivitoPrivateContent.children());
  }

  orderedChildren(): Obj[] {
    return wrapInAppClass(this._scrivitoPrivateContent.orderedChildren());
  }

  permalink(): string | null {
    return this._scrivitoPrivateContent.permalink();
  }

  siteId(): string | null {
    return this._scrivitoPrivateContent.siteId();
  }

  language(): string | null {
    return this._scrivitoPrivateContent.language();
  }

  slug(): string {
    return this._scrivitoPrivateContent.slug();
  }

  isBinary(): boolean {
    const schema = Schema.forInstance(this);

    if (!schema) return false;

    return schema.isBinary();
  }

  isRestricted(): boolean {
    return this._scrivitoPrivateContent.isRestricted();
  }

  contentLength(): number {
    if (this.isBinary()) return this._scrivitoPrivateContent.contentLength();

    return 0;
  }

  contentType(): string {
    if (this.isBinary()) return this._scrivitoPrivateContent.contentType();

    return '';
  }

  contentUrl(): string {
    if (this.isBinary()) return this._scrivitoPrivateContent.contentUrl();

    return '';
  }

  contentId(): string {
    return this._scrivitoPrivateContent.contentId();
  }

  metadata(): MetadataCollection {
    if (this.isBinary()) return this._scrivitoPrivateContent.metadata();

    return new MetadataCollection();
  }

  restrict(): void {
    this._scrivitoPrivateContent.restrict();
  }

  unrestrict(): void {
    this._scrivitoPrivateContent.unrestrict();
  }

  updateReferences(mapping: ReferenceMapping): Promise<void>;

  /** @internal */
  updateReferences(
    mapping: ReferenceMapping,
    ...excessArgs: never[]
  ): Promise<void> {
    checkUpdateReferences(mapping, ...excessArgs);

    return updateReferences(this._scrivitoPrivateContent, mapping);
  }

  widget(id: string): Widget | null {
    const maybeWidget = this._scrivitoPrivateContent.widget(id);
    return maybeWidget && wrapInAppClass(maybeWidget);
  }

  widgets(): Widget[] {
    return wrapInAppClass(subWidgets(this._scrivitoPrivateContent));
  }

  copy(): Promise<Obj<AttrDefs>> {
    return copyObjViaHandler(this._scrivitoPrivateContent).then((newObj) =>
      wrapInAppClass<AttrDefs>(newObj)
    );
  }

  destroy(): void {
    this._scrivitoPrivateContent.destroy();
  }

  attributeDefinitions(): NormalizedAttributeDefinitions {
    const schema = Schema.forInstance(this);
    if (!schema) return {};

    return schema.normalizedAttributes();
  }
}

const checkObjOnSite = checkArgumentsFor('Obj.onSite', [['siteId', t.String]], {
  docPermalink: 'js-sdk/Obj-static-onSite',
});

const checkUpdateReferences = checkArgumentsFor(
  'obj.updateReferences',
  [['mapping', t.Function]],
  {
    docPermalink: 'js-sdk/Obj-updateReferences',
  }
);

const checkVersionOnSite = checkArgumentsFor(
  'obj.versionOnSite',
  [['siteId', t.String]],
  {
    docPermalink: 'js-sdk/Obj-versionOnSite',
  }
);
