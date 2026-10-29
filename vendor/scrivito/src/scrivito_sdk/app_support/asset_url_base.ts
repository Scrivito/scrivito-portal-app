import { ConfigStore, onReset } from 'scrivito_sdk/common';

declare global {
  let __webpack_public_path__: string;
}

const config = new ConfigStore<string>();

export function getAssetUrlBase(): string {
  return config.get();
}

export async function assetLoadingReady(): Promise<void> {
  await config.fetch();
}

export function configureAssetUrlBase(assetUrlBase: string): void {
  config.set(assetUrlBase);
  __webpack_public_path__ = `${assetUrlBase}/`;
}

export function initializeAssetUrlBase() {
  // No dynamic import should happen, before configureAssetUrlBase has been
  // called (via Scrivito.configure), since the SDK does not know the
  // ASSET_URL_BASE until then.
  //
  // Configure webpack to an invalid URL to help debugging.
  __webpack_public_path__ = 'https://example.org/scrivito-internal-error/';
}

// For test purpose only
export function resetAssetUrlBase(): void {
  config.reset();
  initializeAssetUrlBase();
}

onReset(resetAssetUrlBase);
