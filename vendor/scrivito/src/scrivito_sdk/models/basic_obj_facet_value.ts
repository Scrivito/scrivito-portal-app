import { ObjSpaceId } from 'scrivito_sdk/client';
import { FacetValueData } from 'scrivito_sdk/data';
import { BasicObj, getObjFrom } from 'scrivito_sdk/models';
import { objSpaceScopeExcludingDeleted } from 'scrivito_sdk/models/obj_space_scope_excluding_deleted';

export class BasicObjFacetValue {
  constructor(
    private readonly objSpaceId: ObjSpaceId,
    private readonly facet: FacetValueData
  ) {}

  name(): string {
    return this.facet.name;
  }

  count(): number {
    return this.facet.count;
  }

  includedObjs(): BasicObj[] {
    const scope = objSpaceScopeExcludingDeleted(this.objSpaceId);

    return this.facet.includedObjIds
      .map((id) => getObjFrom(scope, id))
      .filter((obj): obj is BasicObj => !!obj);
  }
}
