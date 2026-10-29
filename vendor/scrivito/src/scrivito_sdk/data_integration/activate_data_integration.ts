import { onReset } from 'scrivito_sdk/common';

let dataIntegrationActive = false;

export function activateDataIntegration(): void {
  dataIntegrationActive = true;
}

export function isDataIntegrationActive(): boolean {
  return dataIntegrationActive;
}

onReset(() => (dataIntegrationActive = false));
