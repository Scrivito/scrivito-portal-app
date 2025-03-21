import { ScopeTransformation } from 'scrivito_sdk/models';

export function restrictToContent(contentId: string): ScopeTransformation {
  return {
    isInScope(obj) {
      return obj.contentId() === contentId;
    },

    applyToSearch(search) {
      return search.and('_contentId', 'equals', contentId);
    },

    applyToCreate(attributes) {
      return { ...attributes, _content_id: contentId };
    },
  };
}
