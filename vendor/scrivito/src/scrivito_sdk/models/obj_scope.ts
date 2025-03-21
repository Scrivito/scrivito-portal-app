import {
  EMPTY_SPACE,
  ExistentObjJson,
  ObjSpaceId,
  isEmptySpaceId,
  isRevisionObjSpaceId,
} from 'scrivito_sdk/client';
import { InternalError, ScrivitoError } from 'scrivito_sdk/common';
import { createObjData, getObjData } from 'scrivito_sdk/data';
import { BasicObj, BasicObjSearch } from 'scrivito_sdk/models';
import { ObjUnavailable } from 'scrivito_sdk/models/obj_unavailable';

/** a Scope defines how Objs are retrieved, searched and created.
 * ScopeTransformations can be used to build new Scopes from existing ones.
 */
export interface ObjScope {
  get(id: string): BasicObj | ObjUnavailable;
  search(): BasicObjSearch;
  create(id: string, attributes: Partial<ExistentObjJson>): BasicObj;

  and(transformation: ScopeTransformation): ObjScope;
}

/** a ScopeTransformation can be used to add a new "aspect" to an existing Scope.
 *
 * A ScopeTransformation retricts the scope: it always makes the Scope (potentially) "smaller",
 * i.e. the Objs in a transformed scope are always a subset of the Objs in the original scope.
 */
export interface ScopeTransformation {
  isInScope(obj: BasicObj): boolean;
  applyToSearch(search: BasicObjSearch): void;
  applyToCreate(attributes: Partial<ExistentObjJson>): Partial<ExistentObjJson>;
}

export function objSpaceScope(objSpaceId: ObjSpaceId): ObjScope {
  return new ObjSpaceScope(objSpaceId);
}

/** An ObjSpaceScope binds the getting, searching and creating of Objs to the given ObjSpace.
 *
 * ObjSpaceScope is the only Scope that can be constructed directly.
 * All other Scopes are created by chaining transformations onto an initial ObjSpaceScope.
 */
class ObjSpaceScope implements ObjScope {
  constructor(private objSpaceId: ObjSpaceId) {}

  get(id: string): BasicObj | ObjUnavailable {
    const objData = getObjData(this.objSpaceId, id);

    if (!objData) return new ObjUnavailable(id, 'notLoaded');
    if (!objData.isUnavailable()) return new BasicObj(objData);
    if (objData.isForbidden()) return new ObjUnavailable(id, 'forbidden');

    return new ObjUnavailable(id, 'nonexistent');
  }

  search(): BasicObjSearch {
    return new BasicObjSearch(
      isRevisionObjSpaceId(this.objSpaceId) ? EMPTY_SPACE : this.objSpaceId
    ).includeDeleted();
  }

  create(id: string, attributes: Partial<ExistentObjJson>): BasicObj {
    const objClass = attributes._obj_class;

    // Missing "objClass" attribute
    if (!objClass) throw new InternalError();

    if (isEmptySpaceId(this.objSpaceId)) {
      throw new ScrivitoError(
        'Cannot create an obj, because the current site is not yet determined.'
      );
    }

    const objJson = {
      _obj_class: objClass,
      _id: id,
      _site_id: null,
      ...attributes,
    };

    return new BasicObj(createObjData(this.objSpaceId, id, objJson));
  }

  and(transformation: ScopeTransformation): ObjScope {
    return new TransformedScope(this, transformation);
  }
}

/** A TransformedScope is the result of applying a transformation to an existing scope. */
class TransformedScope implements ObjScope {
  constructor(
    private originalScope: ObjScope,
    private transformation: ScopeTransformation
  ) {}

  get(id: string): BasicObj | ObjUnavailable {
    const maybeObj = this.originalScope.get(id);

    if (
      maybeObj instanceof BasicObj &&
      !this.transformation.isInScope(maybeObj)
    ) {
      return new ObjUnavailable(id, 'nonexistent');
    }

    return maybeObj;
  }

  search(): BasicObjSearch {
    const search = this.originalScope.search();
    this.transformation.applyToSearch(search);

    return search;
  }

  create(id: string, attributes: ExistentObjJson): BasicObj {
    const obj = this.originalScope.create(
      id,
      this.transformation.applyToCreate(attributes)
    );

    return obj;
  }

  and(anotherTransformation: ScopeTransformation): ObjScope {
    return new TransformedScope(this, anotherTransformation);
  }
}
