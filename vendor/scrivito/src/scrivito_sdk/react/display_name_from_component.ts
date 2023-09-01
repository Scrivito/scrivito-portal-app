import * as React from 'react';

export function displayNameFromComponent(
  component: React.ComponentType
): string {
  return component.displayName || component.name;
}
