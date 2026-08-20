import { uiAdapter } from 'scrivito_sdk/app_support/ui_adapter';
import { ComparisonRange } from 'scrivito_sdk/client';
import { comparisonFromPublished } from 'scrivito_sdk/models';

export function getComparisonRange(): ComparisonRange {
  return uiAdapter?.comparisonRange() || comparisonFromPublished();
}
