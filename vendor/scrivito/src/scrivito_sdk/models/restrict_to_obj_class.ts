import { ScopeTransformation } from 'scrivito_sdk/models';

export function restrictToObjClass(objClassName: string): ScopeTransformation {
  return {
    isInScope(obj) {
      return obj.objClass() === objClassName;
    },

    applyToSearch(search) {
      return search.and('_objClass', 'equals', objClassName);
    },

    applyToCreate(attributes) {
      return { ...attributes, _obj_class: objClassName };
    },
  };
}
