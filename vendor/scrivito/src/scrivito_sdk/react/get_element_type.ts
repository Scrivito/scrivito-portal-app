import * as React from 'react';

type ElementType = string | React.ComponentType;

export interface ForwardElementTypeProps {
  __scrivitoForwardElementType?: ElementType;
}

export function getElementType(node: React.ReactNode): ElementType | undefined {
  if (React.isValidElement(node)) {
    const forwardedType = (node.props as ForwardElementTypeProps)
      .__scrivitoForwardElementType;

    return forwardedType || node.type;
  }
}

export function forwardElementTypeProps(
  node: React.ReactNode
): ForwardElementTypeProps {
  return { __scrivitoForwardElementType: getElementType(node) };
}
