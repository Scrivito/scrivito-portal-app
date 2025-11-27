import { getTreatLocalhostLike } from 'scrivito_sdk/app_support/treat_localhost_like';
import { uiAdapter } from 'scrivito_sdk/app_support/ui_adapter';
import { BrowserTokenParams } from 'scrivito_sdk/client';
import { ScrivitoError } from 'scrivito_sdk/common';

export function getEditorAuthToken({
  audience,
  authViaAccount,
  authViaInstance,
}: BrowserTokenParams): string | undefined {
  const data = uiAdapter?.getEditorAuthToken({
    audience,
    authViaAccount,
    authViaInstance,
    treatLocalhostLike: getTreatLocalhostLike(),
  });

  if (!data) return;
  if ('error' in data) throw new ScrivitoError(data.error);

  return data.token;
}
