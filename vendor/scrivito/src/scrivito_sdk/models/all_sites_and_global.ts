import { ScopeTransformation } from 'scrivito_sdk/models/obj_scope';

export const allSitesAndGlobal: ScopeTransformation = {
  isInScope: () => true,
  applyToSearch: (search) => search,
  applyToCreate: (attributes) => ({ _site_id: null, ...attributes }),
};
