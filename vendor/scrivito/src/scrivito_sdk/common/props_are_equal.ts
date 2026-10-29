import type { ComponentProps, ComponentType, PropsWithChildren } from 'react';

import { equalsBestEffort } from 'scrivito_sdk/common';

export function propsAreEqual<P extends object>(
  prevProps: Readonly<PropsWithChildren<P>>,
  nextProps: Readonly<PropsWithChildren<P>>,
): boolean;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function propsAreEqual<T extends ComponentType<any>>(
  prevProps: Readonly<ComponentProps<T>>,
  nextProps: Readonly<ComponentProps<T>>,
): boolean {
  return Object.keys(prevProps).every((key) =>
    equalsBestEffort(prevProps[key], nextProps[key]),
  );
}
