import { ScopeTransformation } from 'scrivito_sdk/models/obj_scope';

export function restrictToSiteAndGlobal(siteId: string): ScopeTransformation {
  return {
    isInScope(obj) {
      const objSiteId = obj.siteId();
      return objSiteId === siteId || objSiteId === null;
    },

    applyToSearch(search) {
      return search.and('_siteId', 'equals', [siteId, null]);
    },

    applyToCreate(attributes) {
      return { ...attributes, _site_id: siteId };
    },
  };
}
