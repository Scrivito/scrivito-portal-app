import { Deferred, InternalError } from 'scrivito_sdk/common';

declare global {
  let __webpack_public_path__: string;
}

let current: string | undefined;
const deferred = new Deferred();

export function getAssetUrlBase(): string {
  // asset url base accessed before configured?
  if (!current) throw new InternalError();

  return current;
}

export function assetLoadingReady(): Promise<void> {
  return deferred.promise;
}

export function configureAssetUrlBase(assetUrlBase: string): void {
  // asset url base configured twice?
  if (current) throw new InternalError();

  current = assetUrlBase;
  __webpack_public_path__ = `${current}/`;

  deferred.resolve();
}

export function initializeAssetUrlBase() {
  current = undefined;

  // No dynamic import should happen, before configureAssetUrlBase has been
  // called (via Scrivito.configure), since the SDK does not know the
  // ASSET_URL_BASE until then.
  //
  // Configure webpack to an invalid URL to help debugging.
  __webpack_public_path__ = 'https://example.org/scrivito-internal-error/';
}

// For test purpose only
export function resetAssetUrlBase(): void {
  initializeAssetUrlBase();
}
