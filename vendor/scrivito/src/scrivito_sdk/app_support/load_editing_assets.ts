// @rewire
import { getAssetUrlBase } from 'scrivito_sdk/app_support/asset_url_base';
import { getDocument } from 'scrivito_sdk/common';
import { loadCss } from 'scrivito_sdk/common';

export function loadEditingAssets() {
  loadEditingCss();
  importEditors().then(({ initializeEditors }) => {
    initializeEditors();
  });
}

function loadEditingCss() {
  loadCss(`${getAssetUrlBase()}/scrivito_editing.css`, getDocument());
}

/** exported for test purposes only */
export function importEditors() {
  return import('editors');
}
