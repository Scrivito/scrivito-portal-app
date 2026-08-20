import { onReset } from 'scrivito_sdk/common';
import {
  LazyAsync,
  normalizeLazyAsync,
} from 'scrivito_sdk/data_integration/lazy_async';

interface DataClassConfig {
  refetchOnWindowFocus: () => Promise<false | undefined>;
  skipOfflineHandling: () => Promise<boolean>;
}

let config: { [dataClassName: string]: DataClassConfig } = {};

export function configureExternalDataClass(
  dataClassName: string,
  params: {
    refetchOnWindowFocus: LazyAsync<false | undefined>;
    skipOfflineHandling: LazyAsync<boolean | undefined>;
  },
): void {
  const normalizedSkip = normalizeLazyAsync(params.skipOfflineHandling);

  config[dataClassName] = {
    refetchOnWindowFocus: normalizeLazyAsync(params.refetchOnWindowFocus),
    skipOfflineHandling: async () => (await normalizedSkip()) === true,
  };
}

export function getExternalDataClassNames(): string[] {
  return Object.keys(config);
}

export async function shouldRefetchOnWindowFocus(
  dataClassName: string,
): Promise<boolean> {
  const entry = config[dataClassName];
  if (!entry) return false;
  return ((await entry.refetchOnWindowFocus()) ?? true) !== false;
}

export async function shouldSkipOfflineHandlingFor(
  dataClassName: string,
): Promise<boolean> {
  const entry = config[dataClassName];
  return entry ? entry.skipOfflineHandling() : false;
}

onReset(() => (config = {}));
