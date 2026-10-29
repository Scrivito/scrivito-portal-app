import { BasicObjFacetValue } from 'scrivito_sdk/models';
import { Obj } from 'scrivito_sdk/realm';
import { wrapInAppClass } from 'scrivito_sdk/realm/wrap_in_app_class';

/** @public */
export class ObjFacetValue {
  /** @internal */
  private readonly _basicObjFacetValue: BasicObjFacetValue;

  /** @internal */
  constructor(basicObjFacetValue: BasicObjFacetValue) {
    this._basicObjFacetValue = basicObjFacetValue;
  }

  name(): string {
    return this._basicObjFacetValue.name();
  }

  count(): number {
    return this._basicObjFacetValue.count();
  }

  includedObjs(): Obj[] {
    const response = this._basicObjFacetValue.includedObjs();
    return wrapInAppClass(response);
  }
}
