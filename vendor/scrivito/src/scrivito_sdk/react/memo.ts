import * as React from 'react';

import { propsAreEqual } from 'scrivito_sdk/common';

export function memo<P extends object>(
  Component: React.ComponentType<P>
): React.NamedExoticComponent<P>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function memo<T extends React.ComponentType<any>>(
  Component: T
): React.MemoExoticComponent<T> {
  return React.memo(Component, propsAreEqual);
}
