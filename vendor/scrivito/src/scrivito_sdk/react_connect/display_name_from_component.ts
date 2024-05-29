import * as React from 'react';

export function displayNameFromComponent<Props>(
  component: React.ComponentType<Props>
): string {
  return component.displayName || component.name;
}
