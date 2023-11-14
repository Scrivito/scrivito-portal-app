import * as URI from 'urijs';

import { isUserLoggedIn } from 'scrivito_sdk/app_support/current_user';
import { isRunningInBrowser } from 'scrivito_sdk/app_support/node_adapter';
import { currentOrigin } from 'scrivito_sdk/common';

export const DEFAULT_CMS_ENDPOINT = 'api.scrivito.com';

export function getDefaultCmsEndpoint({
  configuredJrRestApiEndpoint,
  configuredEndpoint,
}: {
  configuredJrRestApiEndpoint?: string;
  configuredEndpoint?: string;
}): string {
  return withEnsuredProtocol(
    isRunningInBrowser() && isUserLoggedIn()
      ? (configuredJrRestApiEndpoint || getJrRestApiDefaultEndpoint()) +
          '/scrivito'
      : configuredEndpoint || DEFAULT_CMS_ENDPOINT
  );
}

function withEnsuredProtocol(cmsEndpoint: string) {
  return cmsEndpoint.startsWith('http')
    ? cmsEndpoint
    : `https://${cmsEndpoint}`;
}

export function getJrRestApiDefaultEndpoint() {
  const origin = currentOrigin();

  // Node.js
  if (!origin) return 'https://api.justrelate.com';

  const originUri = URI(origin);

  // Forward localhost requests as is
  if (originUri.domain() === 'localhost') return originUri.origin();

  return originUri.subdomain('api').origin();
}
