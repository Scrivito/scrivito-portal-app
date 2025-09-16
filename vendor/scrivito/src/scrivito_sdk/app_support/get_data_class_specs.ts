import union from 'lodash-es/union';

import {
  AttributeEditingConfig,
  AttributesEditingConfig,
} from 'scrivito_sdk/app_support/editing_config';
import {
  DataAttributeConfig,
  NormalizedDataAttributeDefinitions,
} from 'scrivito_sdk/data_integration';

export function computeDataAttributeNames(
  attributes?: NormalizedDataAttributeDefinitions,
  editingConfig?: AttributesEditingConfig
): string[] {
  return union(
    attributes ? Object.keys(attributes) : [],
    editingConfig ? Object.keys(editingConfig) : []
  ).sort();
}

export function getDataAttributeTitle(
  editingConfig?: AttributeEditingConfig,
  config?: DataAttributeConfig
): string | undefined {
  return editingConfig?.title ?? config?.title;
}
