import type { IamApiKey } from 'scrivito_sdk/app_support/configure';
import { FetchedToken, fetchJson, toFetchedToken } from 'scrivito_sdk/client';

export async function fetchIamToken(apiKey: IamApiKey): Promise<FetchedToken> {
  const response = await fetchJson('https://api.justrelate.com/iam/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${btoa(
        `${encodeURIComponent(apiKey.clientId)}:${encodeURIComponent(
          apiKey.clientSecret,
        )}`,
      )}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
    isIdempotent: true,
  });

  return toFetchedToken(response);
}
