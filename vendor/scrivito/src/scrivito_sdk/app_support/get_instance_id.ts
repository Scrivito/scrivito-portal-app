import { ScrivitoError, tryGetConfiguredTenant } from 'scrivito_sdk/common';

/** @public */
export function getInstanceId(): string {
  const configuredTenant = tryGetConfiguredTenant();
  if (configuredTenant) return configuredTenant;

  throw new ScrivitoError(
    "Function invoked before calling 'Scrivito.configure'"
  );
}
