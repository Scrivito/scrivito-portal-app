import { ReactNode, isValidElement } from 'react';

type ElementType = string | React.ComponentType;

interface ForwardElementTypeProps {
  __scrivitoForwardElementType?: ElementType;
}

export function getElementType(node: ReactNode): ElementType | undefined {
  if (isValidElement(node)) {
    const forwardedType = (node.props as ForwardElementTypeProps)
      .__scrivitoForwardElementType;

    return forwardedType || node.type;
  }
}

export function forwardElementTypeProps(
  node: ReactNode
): ForwardElementTypeProps {
  return { __scrivitoForwardElementType: getElementType(node) };
}
