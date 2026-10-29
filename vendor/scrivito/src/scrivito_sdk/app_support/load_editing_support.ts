import { assetLoadingReady } from 'scrivito_sdk/app_support/asset_url_base';

export async function loadEditingSupport() {
  await assetLoadingReady();

  return import('scrivito_sdk/editing_support');
}
