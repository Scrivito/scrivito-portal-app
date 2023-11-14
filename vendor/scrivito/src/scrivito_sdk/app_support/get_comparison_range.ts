import { uiAdapter } from 'scrivito_sdk/app_support/ui_adapter';
import { ComparisonRange, PUBLISHED_SPACE } from 'scrivito_sdk/client';
import { currentObjSpaceId } from 'scrivito_sdk/models';

export function getComparisonRange(): ComparisonRange {
  return uiAdapter?.comparisonRange() || [PUBLISHED_SPACE, currentObjSpaceId()];
}
