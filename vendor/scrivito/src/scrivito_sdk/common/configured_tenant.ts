import { Deferred, InternalError } from 'scrivito_sdk/common';

let configuredTenant: string | undefined;
let deferredConfiguredTenant = new Deferred<string | undefined>();

export function tryGetConfiguredTenant(): string | undefined {
  return configuredTenant;
}

export function getConfiguredTenant(): string {
  if (!configuredTenant) throw new InternalError();

  return configuredTenant;
}

export async function fetchConfiguredTenant(): Promise<string> {
  const resolvedTenant = await deferredConfiguredTenant;
  if (!resolvedTenant) throw new InternalError();

  return resolvedTenant;
}

/** Prefer to use `fetchConfiguredTenant` if possible. */
export async function fetchMaybeTenant(): Promise<string | undefined> {
  return deferredConfiguredTenant;
}

export function hasTenantConfigurationBeenSet(): boolean {
  return !deferredConfiguredTenant.isPending();
}

export function setConfiguredTenant(tenant: string | undefined): void {
  configuredTenant = tenant;
  deferredConfiguredTenant.resolve(tenant);
}

// (not relevant for SDK) has this UI been configured to not access any tenant?
export function isConfiguredWithoutTenant(): boolean {
  return hasTenantConfigurationBeenSet() && configuredTenant === undefined;
}

export function resetConfiguredTenant(): void {
  deferredConfiguredTenant = new Deferred();
  configuredTenant = undefined;
}
