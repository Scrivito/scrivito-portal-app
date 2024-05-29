import { ArgumentError, BlobType, FileType } from 'scrivito_sdk/common';
import {
  FieldBoost,
  FullTextSearchOperator,
  ObjScope,
  SearchField,
  SearchOperator,
  createObjFromFileIn,
  createObjIn,
  excludeDeletedObjs,
  excludeGlobal,
  getObjBy,
  getObjFrom,
  getRootObjFrom,
  restrictToObjClass,
} from 'scrivito_sdk/models';

import { AttributeDefinitions, Obj, ObjClass } from 'scrivito_sdk/realm';
import { initialAttributesFor } from 'scrivito_sdk/realm/initial_attributes_for';
import { ObjAttributes } from 'scrivito_sdk/realm/obj';
import { ObjSearch, SearchValue } from 'scrivito_sdk/realm/obj_search';
import { Schema } from 'scrivito_sdk/realm/schema';
import {
  unwrapAppAttributes,
  wrapInAppClass,
} from 'scrivito_sdk/realm/wrap_in_app_class';
import { objClassNameFor } from './registry';

export interface SiteContext<
  AttrDefs extends AttributeDefinitions = AttributeDefinitions
> {
  create(params?: ObjAttributes<AttrDefs>): Obj<AttrDefs>;
  createFromFile(
    file: File,
    attributes?: ObjAttributes<AttrDefs>
  ): Promise<Obj<AttrDefs>>;
  get(objId: string): Obj<AttrDefs> | null;
  getIncludingDeleted(objId: string): Obj<AttrDefs> | null;
  getByPath(path: string): Obj<AttrDefs> | null;
  getByPermalink(permalink: string): Obj<AttrDefs> | null;
  root(): Obj | null;
  all(): ObjSearch<AttrDefs>;
  where(
    fields: SearchField,
    operator: SearchOperator,
    value: SearchValue,
    boost?: FieldBoost
  ): ObjSearch<AttrDefs>;
  whereFullTextOf(
    fields: SearchField,
    operator: FullTextSearchOperator,
    value: SearchValue,
    boost?: FieldBoost
  ): ObjSearch<AttrDefs>;
}

export class BasicSiteContext<AttrDefs extends AttributeDefinitions>
  implements SiteContext<AttrDefs>
{
  constructor(
    private readonly objClass: ObjClass,
    private readonly scopeIncludingDeletedObjs: ObjScope
  ) {}

  get(id: string): Obj<AttrDefs> | null {
    return this.getObj(id, this.scope());
  }

  getIncludingDeleted(id: string): Obj<AttrDefs> | null {
    return this.getObj(id, this.scopeIncludingDeletedObjs);
  }

  getByPath(path: string): Obj<AttrDefs> | null {
    const obj = getObjBy(this.scope().and(excludeGlobal), '_path', path);
    return wrapInAppClass<AttrDefs>(obj);
  }

  getByPermalink(permalink: string): Obj<AttrDefs> | null {
    const obj = getObjBy(this.scope(), '_permalink', permalink);
    return wrapInAppClass<AttrDefs>(obj);
  }

  root(): Obj | null {
    return wrapInAppClass(getRootObjFrom(this.scope()));
  }

  all(): ObjSearch<AttrDefs> {
    return this.getSearch(1000);
  }

  where(
    attribute: SearchField,
    operator: SearchOperator,
    value: SearchValue,
    boost?: FieldBoost
  ): ObjSearch<AttrDefs> {
    return this.getSearch().and(attribute, operator, value, boost);
  }

  whereFullTextOf(
    attribute: SearchField,
    operator: FullTextSearchOperator,
    value: SearchValue,
    boost?: FieldBoost
  ): ObjSearch<AttrDefs> {
    return this.getSearch().andFullTextOf(attribute, operator, value, boost);
  }

  create(attributes: ObjAttributes<AttrDefs> = {}): Obj<AttrDefs> {
    const objClassName = this.objClassNameForCreate();

    assertValidCreateAttributes(attributes);

    const attributesForCreate = prepareAttributesForCreate(
      attributes,
      objClassName,
      // Bang: objClassNameForCreate above ensures that it's a subclass of Obj
      Schema.forClass(this.objClass)!
    );
    const basicObj = createObjIn(
      this.scope().and(restrictToObjClass(objClassName)),
      attributesForCreate
    );

    return wrapInAppClass<AttrDefs>(basicObj);
  }

  createFromFile(
    file: File,
    attributes: ObjAttributes<AttrDefs> = {}
  ): Promise<Obj<AttrDefs>> {
    const objClassName = this.objClassNameForCreate();

    assertValidFile(file);
    assertValidCreateAttributes(attributes);

    if (Object.prototype.hasOwnProperty.call(attributes, 'blob')) {
      throw new ArgumentError(
        'Setting attribute "blob" is not allowed when creating CMS objects from file, ' +
          'because the file will be assigned to that attribute'
      );
    }

    // Bang: objClassNameForCreate above ensures that it's a subclass of Obj
    const schema = Schema.forClass(this.objClass)!;
    if (!schema.isBinary()) {
      throw new ArgumentError(
        'Creating CMS objects from file is only available for classes with a binary attribute "blob"'
      );
    }

    const attributesForCreate = prepareAttributesForCreate(
      attributes,
      objClassName,
      schema
    );

    return createObjFromFileIn(
      this.scope().and(restrictToObjClass(objClassName)),
      file,
      attributesForCreate
    ).then((basicObj) => wrapInAppClass<AttrDefs>(basicObj));
  }

  toSiteContext(): SiteContext<AttrDefs> {
    return {
      get: this.get.bind(this),
      getIncludingDeleted: this.getIncludingDeleted.bind(this),
      getByPath: this.getByPath.bind(this),
      getByPermalink: this.getByPermalink.bind(this),
      root: this.root.bind(this),
      all: this.all.bind(this),
      where: this.where.bind(this),
      whereFullTextOf: this.where.bind(this),
      create: this.create.bind(this),
      createFromFile: this.createFromFile.bind(this),
    };
  }

  private getObj(id: string, scope: ObjScope) {
    return wrapInAppClass<AttrDefs>(
      getObjFrom(this.getScopeRestrictedToSameClass(scope), id)
    );
  }

  private getSearch(batchSize?: 1000) {
    const search = this.getScopeRestrictedToSameClass(this.scope()).search();

    if (batchSize !== undefined) search.batchSize(batchSize);

    return new ObjSearch<AttrDefs>(search);
  }

  private getScopeRestrictedToSameClass(scope: ObjScope) {
    const objClassName = this.objClassName();
    return objClassName ? scope.and(restrictToObjClass(objClassName)) : scope;
  }

  private objClassName() {
    return objClassNameFor(this.objClass);
  }

  private objClassNameForCreate() {
    const objClassName = this.objClassName();

    if (!objClassName) {
      throw new ArgumentError(
        'Use a specific class (like Page or Image) in order to create an Obj.'
      );
    }

    return objClassName;
  }

  private scope() {
    return this.scopeIncludingDeletedObjs.and(excludeDeletedObjs);
  }
}

function prepareAttributesForCreate(
  appAttributes: { [key: string]: unknown },
  appClassName: string,
  schema: Schema
) {
  const initialAttributes = initialAttributesFor(
    appAttributes,
    schema,
    appClassName
  );
  const createAttributes = {
    ...appAttributes,
    ...initialAttributes,
  };

  return unwrapAppAttributes(createAttributes, schema, appClassName);
}

function assertValidCreateAttributes(attributes: { [key: string]: unknown }) {
  if (attributes.constructor !== Object) {
    throw new ArgumentError(
      'The provided attributes are invalid. They have ' +
        'to be an Object with valid Scrivito attribute values.'
    );
  }

  if (attributes._objClass) {
    throw new ArgumentError(
      'Invalid attribute "_objClass". ' +
        `"${String(
          attributes._objClass
        )}.create" will automatically set the CMS object class ` +
        'correctly.'
    );
  }
}

function assertValidFile(file: unknown) {
  if (!FileType.is(file)) {
    if (BlobType.is(file)) {
      throw new ArgumentError(
        'Creating CMS objects from file is only available with instances of "File", ' +
          'but an instance of "Blob" is given'
      );
    }

    throw new ArgumentError(
      'Creating CMS objects from file is only available with instances of "File"'
    );
  }
}
