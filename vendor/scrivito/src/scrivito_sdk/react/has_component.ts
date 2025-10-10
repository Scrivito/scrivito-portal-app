import { getComponentForAppClass } from 'scrivito_sdk/react/component_registry';

export function hasComponent(name: string): boolean {
  return !!getComponentForAppClass(name);
}
