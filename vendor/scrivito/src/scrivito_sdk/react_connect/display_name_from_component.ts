import type { ComponentType } from 'react';

export function displayNameFromComponent<Props>(
  component: ComponentType<Props>,
): string {
  return component.displayName || component.name;
}
