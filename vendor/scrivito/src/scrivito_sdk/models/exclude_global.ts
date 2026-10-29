import { InternalError } from 'scrivito_sdk/common';
import { ScopeTransformation } from 'scrivito_sdk/models/obj_scope';

export const excludeGlobal: ScopeTransformation = {
  isInScope(obj) {
    return obj.siteId() !== null;
  },

  applyToSearch(search) {
    return search.andNot('_siteId', 'equals', null);
  },

  applyToCreate() {
    // Unsupported create
    throw new InternalError();
  },
};
