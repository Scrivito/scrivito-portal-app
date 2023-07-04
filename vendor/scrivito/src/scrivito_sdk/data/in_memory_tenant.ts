import { ScrivitoError } from 'scrivito_sdk/common';

export const IN_MEMORY_TENANT = 'inMemory';

let inMemoryTenant = false;

export function isUsingInMemoryTenant(): boolean {
  return inMemoryTenant;
}

export function useInMemoryTenant(): void {
  inMemoryTenant = true;
}

export function assertNotUsingInMemoryTenant(
  operationDescription: string
): void {
  if (inMemoryTenant) {
    throw new InMemoryTenantUnsupportedOperationError(operationDescription);
  }
}

// For test purpose only.
export function resetInMemoryTenant(): void {
  inMemoryTenant = false;
}

export class InMemoryTenantUnsupportedOperationError extends ScrivitoError {
  constructor(description: string) {
    super(`${description} is not supported when using the in-memory tenant`);
  }
}
