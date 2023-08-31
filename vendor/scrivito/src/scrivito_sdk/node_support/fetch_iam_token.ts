import type { IamApiKey } from 'scrivito_sdk/app_support/configure';
import { fetchToRawResponse, requestApiIdempotent } from 'scrivito_sdk/client';

interface IamTokenResponse {
  access_token: string;
}

export async function fetchIamToken(apiKey: IamApiKey): Promise<String> {
  const response = await requestApiIdempotent(
    () =>
      fetchToRawResponse('https://api.justrelate.com/iam/token', {
        method: 'POST',
        headers: {
          Authorization: `Basic ${btoa(
            `${apiKey.clientId}:${apiKey.clientSecret}`
          )}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'grant_type=client_credentials',
      }),
    false
  );

  return (response as IamTokenResponse).access_token;
}
