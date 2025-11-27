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
  const set = new Set<string>();
  if (attributes) Object.keys(attributes).forEach((k) => set.add(k));
  if (editingConfig) Object.keys(editingConfig).forEach((k) => set.add(k));
  return Array.from(set).sort();
}

export function getDataAttributeTitle(
  editingConfig?: AttributeEditingConfig,
  config?: DataAttributeConfig
): string | undefined {
  return editingConfig?.title ?? config?.title;
}
