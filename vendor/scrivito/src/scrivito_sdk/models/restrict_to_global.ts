import { ScopeTransformation } from 'scrivito_sdk/models/obj_scope';

export const restrictToGlobal: ScopeTransformation = {
  isInScope(obj) {
    return obj.siteId() === null;
  },

  applyToSearch(search) {
    return search.and('_siteId', 'equals', null);
  },

  applyToCreate(attributes) {
    return { ...attributes, _site_id: null };
  },
};
