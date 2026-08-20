import upperFirst from 'lodash-es/upperFirst';

import { fetchJson, getTokenProvider } from 'scrivito_sdk/client';
import { ArgumentError, logInfo } from 'scrivito_sdk/common';
import {
  DataClass,
  getDataClass,
  provideDataClass,
} from 'scrivito_sdk/data_integration';
import { registerNamespace } from 'scrivito_sdk/data_integration/data_service_namespace_registry';
import { isValidDataIdentifier } from 'scrivito_sdk/models';

export interface DataServiceManifest {
  resources: string[];
}

/** @public */
export async function provideDataService(
  baseUrl: string,
  options?: {
    headers?: Record<string, string>;
    namespace?: string;
  },
): Promise<DataClass[]> {
  const namespace = options?.namespace ?? '';
  registerNamespace(namespace);

  const normalizedBaseUrl = baseUrl.replace(/\/+$/, '');
  const resources = await fetchAndValidateManifest(normalizedBaseUrl);

  return resources.reduce<DataClass[]>((dataClasses, resourcePath) => {
    const dataClass = registerDataClassForResource(
      resourcePath,
      normalizedBaseUrl,
      options,
    );

    return dataClass ? [...dataClasses, dataClass] : dataClasses;
  }, []);
}

function registerDataClassForResource(
  resourcePath: string,
  baseUrl: string,
  options?: { namespace?: string; headers?: Record<string, string> },
) {
  const className = toClassName(resourcePath, options?.namespace);

  if (!isValidDataIdentifier(className)) {
    throw new ArgumentError(
      `Invalid data class name "${className}" from resource "${resourcePath}"`,
    );
  }

  if (getDataClass(className)) {
    logInfo(
      `Data class "${className}" from data service manifest (resource: "${resourcePath}") is ignored because a data class with this name already exists (defined via provideDataClass).`,
    );

    return null;
  }

  return provideDataClass(className, {
    restApi: { url: `${baseUrl}/${resourcePath}`, headers: options?.headers },
  });
}

async function fetchAndValidateManifest(baseUrl: string) {
  let audience: string;

  try {
    audience = new URL(baseUrl).origin;
  } catch {
    throw new ArgumentError(`Invalid baseUrl: "${baseUrl}"`);
  }

  const manifestUrl = `${baseUrl}/_manifest`;

  const response = await fetchJson(manifestUrl, {
    method: 'GET',
    authProvider: getTokenProvider({ audience }),
  });

  if (
    response &&
    typeof response === 'object' &&
    'resources' in response &&
    Array.isArray(response.resources) &&
    response.resources.every((resource) => typeof resource === 'string')
  ) {
    return response.resources;
  }

  throw new ArgumentError(
    `Invalid data service manifest for url "${baseUrl}". Received: ${JSON.stringify(response)}`,
  );
}

function toClassName(subPath: string, namespace?: string) {
  const normalizedPath = subPath.split(/[-_]/).map(upperFirst).join('');
  return namespace ? `${namespace}_${normalizedPath}` : normalizedPath;
}
