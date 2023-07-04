import { getScrivitoVersion } from 'scrivito_sdk/common';

export function cdnAssetUrlBase(): string {
  return `https://assets.scrivito.com/sjs/${getScrivitoVersion()}`;
}
