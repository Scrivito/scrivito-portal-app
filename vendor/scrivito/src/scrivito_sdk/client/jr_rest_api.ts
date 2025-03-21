// @rewire

import { clientConfig } from 'scrivito_sdk/client';
import { createRestApiClient } from 'scrivito_sdk/client/create_rest_api_client';
import { joinPaths } from 'scrivito_sdk/client/join_paths';
import { InternalError } from 'scrivito_sdk/common';

export async function getIamAuthUrl(path = ''): Promise<string> {
  const iamAuthLocation = (await clientConfig.fetch()).iamAuthLocation;
  if (!iamAuthLocation) throw new InternalError();

  return joinPaths(iamAuthLocation, path);
}

export const JrRestApi = createRestApiClient('https://api.justrelate.com');
