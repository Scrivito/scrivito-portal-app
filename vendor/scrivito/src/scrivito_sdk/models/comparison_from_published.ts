import { ComparisonRange } from 'scrivito_sdk/client';
import { publishedSpace } from 'scrivito_sdk/models';
import { currentObjSpaceId } from 'scrivito_sdk/models/current_workspace_id';

/** comparison from published content to current workspace */
export function comparisonFromPublished(): ComparisonRange {
  return [publishedSpace(), currentObjSpaceId()];
}
