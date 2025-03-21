import { getScrivitoVersion } from 'scrivito_sdk/common/get_scrivito_version';

export function cdnAssetUrlBase(): string {
  return `https://assets.scrivito.com/sjs/${getScrivitoVersion()}`;
}
