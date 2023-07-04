import * as URI from 'urijs';
import { getConfiguration } from 'scrivito_sdk/app_support/configure';
import { ScrivitoPromise } from 'scrivito_sdk/common';

export function checkIfTrustedOrigin(origin: string): Promise<boolean> {
  if (origin === window.location.origin) return ScrivitoPromise.resolve(true);
  if (originMatches(origin, 'https://*.scrivito.com')) {
    return ScrivitoPromise.resolve(true);
  }

  return getConfiguration().then((configuration) => {
    const adoptUi = configuration.adoptUi;
    if (typeof adoptUi === 'string' && originMatches(origin, adoptUi)) {
      return true;
    }

    const unstableOrigins = configuration.unstable?.trustedUiOrigins ?? [];

    const origins = [...unstableOrigins, ...getLocalOrigins()];

    return origins.some((trustedOrigin) =>
      originMatches(origin, trustedOrigin)
    );
  });
}

function originMatches(origin: string, pattern: string): boolean {
  const originUrl = new URI(origin);
  const patternUrl = new URI(pattern);

  return (
    originUrl.protocol() === patternUrl.protocol() &&
    hostMatches(originUrl.host(), patternUrl.host())
  );
}

function hostMatches(host: string, hostPattern: string) {
  if (hostPattern.substr(0, 2) === '*.') {
    const postfix = hostPattern.substr(1);

    return host.substr(-postfix.length) === postfix;
  }

  return host === hostPattern;
}

function getLocalOrigins() {
  try {
    // use this to make your local browser trust certain UI origins.
    // intended for debugging purposes.
    // note: you may have to allow 3rd party cookies in your browser
    // for this to work!
    return (
      localStorage.getItem('SCRIVITO_TRUSTED_UI_ORIGINS')?.split(' ') ?? []
    );
  } catch (anyError) {
    return [];
  }
}
