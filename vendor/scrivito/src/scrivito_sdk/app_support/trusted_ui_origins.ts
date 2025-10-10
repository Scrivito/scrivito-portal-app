import { getConfiguration } from 'scrivito_sdk/app_support/configure';

export async function checkIfTrustedOrigin(origin: string): Promise<boolean> {
  if (
    origin === window.location.origin ||
    originMatches(origin, 'https://*.scrivito.com')
  ) {
    return true;
  }

  const configuration = await getConfiguration();
  const adoptUi = configuration.adoptUi;
  if (typeof adoptUi === 'string' && originMatches(origin, adoptUi)) {
    return true;
  }

  const unstableOrigins = configuration.unstable?.trustedUiOrigins ?? [];

  const origins = [...unstableOrigins, ...getLocalOrigins()];

  return origins.some((trustedOrigin) => originMatches(origin, trustedOrigin));
}

function originMatches(origin: string, pattern: string): boolean {
  const patternParts = pattern.split('//*');

  if (patternParts.length !== 2) return origin === pattern;

  const [patternUrlProtocol, hostSuffix] = patternParts;

  const originUrl = new URL(origin);

  return (
    originUrl.protocol === patternUrlProtocol &&
    hostSuffix.startsWith('.') &&
    originUrl.host.endsWith(hostSuffix)
  );
}

function getLocalOrigins() {
  // use this to make your local browser trust certain UI origins.
  // intended for debugging purposes.
  // note: you may have to allow 3rd party cookies in your browser
  // for this to work!
  return (
    window.localStorage.getItem('SCRIVITO_TRUSTED_UI_ORIGINS')?.split(' ') ?? []
  );
}
