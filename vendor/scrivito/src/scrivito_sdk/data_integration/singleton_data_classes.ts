import { createStateContainer } from 'scrivito_sdk/state';

const stateContainer = createStateContainer<string[]>();

export function registerSingletonDataClass(dataClassName: string): void {
  stateContainer.set([...getDataClassNames(), dataClassName]);
}

export function isSingletonDataClass(dataClassName: string): boolean {
  return getDataClassNames().includes(dataClassName);
}

function getDataClassNames() {
  return stateContainer.get() || [];
}
