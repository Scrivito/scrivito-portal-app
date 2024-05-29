import { getTreatLocalhostLike } from 'scrivito_sdk/app_support/treat_localhost_like';
import { uiAdapter } from 'scrivito_sdk/app_support/ui_adapter';
import { ScrivitoError } from 'scrivito_sdk/common';

export function getEditorAuthToken(audience?: string): string | undefined {
  const data = uiAdapter?.getEditorAuthToken({
    audience,
    treatLocalhostLike: getTreatLocalhostLike(),
  });

  if (!data) return;
  if ('error' in data) throw new ScrivitoError(data.error);

  return data.token;
}
