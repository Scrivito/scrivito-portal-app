// @rewire
import { getAssetUrlBase } from 'scrivito_sdk/app_support/asset_url_base';
import { getDocument, loadCss } from 'scrivito_sdk/common';

export async function loadEditingAssets() {
  loadEditingCss();
  const { initializeEditors } = await importEditors();
  initializeEditors();
}

function loadEditingCss() {
  loadCss(`${getAssetUrlBase()}/scrivito_editing.css`, getDocument());
}

/** exported for test purposes only */
export function importEditors() {
  return import('editors');
}
