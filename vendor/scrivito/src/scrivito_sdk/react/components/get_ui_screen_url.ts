import { tryGetConfiguration } from 'scrivito_sdk/app_support/configure';
import { getInstanceId } from 'scrivito_sdk/app_support/get_instance_id';
import { ScrivitoError } from 'scrivito_sdk/common';

export function getUiScreenUrl(screen: string, appUrl?: string): string {
  const configuration = tryGetConfiguration();
  if (!configuration) {
    throw new ScrivitoError("must call 'Scrivito.configure' beforehand");
  }

  const adoptUi = configuration.adoptUi;
  const uiDomain = typeof adoptUi === 'string' ? adoptUi : DEFAULT_UI_DOMAIN;

  return `${uiDomain}/${getInstanceId()}/${screen}~${appUrl ?? ''}`;
}

const DEFAULT_UI_DOMAIN = 'https://web-builder.justrelate.com';
