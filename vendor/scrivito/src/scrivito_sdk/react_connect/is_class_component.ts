import { ComponentClass, ComponentType } from 'react';

export function isClassComponent<Props>(
  component: ComponentType<Props>
): component is ComponentClass<Props> {
  return (
    typeof component === 'function' &&
    component.prototype &&
    component.prototype.isReactComponent
  );
}
