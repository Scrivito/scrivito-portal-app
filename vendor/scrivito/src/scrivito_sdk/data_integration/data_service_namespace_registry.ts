import { ArgumentError, onReset } from 'scrivito_sdk/common';

const dataServiceNamespaces = new Set<string>();

export function registerNamespace(namespace: string): void {
  if (dataServiceNamespaces.has(namespace)) {
    throw new ArgumentError(
      `Namespace "${namespace}" was already used in a previous provideDataService call`,
    );
  }

  dataServiceNamespaces.add(namespace);
}

onReset(() => {
  dataServiceNamespaces.clear();
});
