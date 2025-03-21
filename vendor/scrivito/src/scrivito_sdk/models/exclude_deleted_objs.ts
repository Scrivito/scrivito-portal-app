import { ScopeTransformation } from 'scrivito_sdk/models/obj_scope';

export const excludeDeletedObjs: ScopeTransformation = {
  isInScope(obj) {
    return !obj.isDeleted();
  },

  applyToSearch(search) {
    return search.excludeDeleted();
  },

  applyToCreate(attributes) {
    // a newly created obj is not deleted, by definition.
    // => nothing to do here
    return attributes;
  },
};
