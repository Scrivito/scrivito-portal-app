import { ScopeTransformation } from 'scrivito_sdk/models/obj_scope';

export function restrictToSite(siteId: string): ScopeTransformation {
  return {
    isInScope(obj) {
      return obj.siteId() === siteId;
    },

    applyToSearch(search) {
      return search.and('_siteId', 'equals', siteId);
    },

    applyToCreate(attributes) {
      return { ...attributes, _site_id: siteId };
    },
  };
}
