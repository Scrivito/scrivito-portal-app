import { InternalError } from 'scrivito_sdk/common';

let originProvider: undefined | (() => string | undefined);

export function currentOrigin(): string | undefined {
  if (!originProvider) throw new InternalError();
  return originProvider();
}

export function setOriginProvider(provider?: () => string | undefined) {
  originProvider = provider;
}
