import { InternalError } from 'scrivito_sdk/common';

let tenantStored = false;
let configuredTenant: string | undefined;

export function getConfiguredTenant(): string | undefined {
  return configuredTenant;
}

export function setConfiguredTenant(tenant: string | undefined): void {
  /* in a multi-tenancy application like the Scrivito UI,
  this could even be a security-critical error, so take care! */
  if (tenantStored) throw new InternalError();

  configuredTenant = tenant;
  tenantStored = true;
}

// (not relevant for SDK) has this UI been configured to not access any tenant?
export function isConfiguredWithoutTenant(): boolean {
  return tenantStored && configuredTenant === undefined;
}

export function resetConfiguredTenant(): void {
  configuredTenant = undefined;
  tenantStored = false;
}
