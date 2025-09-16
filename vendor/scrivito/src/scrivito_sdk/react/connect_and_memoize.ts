import { memo } from 'scrivito_sdk/react/memo';
import { ComponentType } from 'scrivito_sdk/react/provide_component';
import {
  ConnectOptions,
  connect,
  displayNameFromComponent,
  isClassComponent,
} from 'scrivito_sdk/react_connect';

export function connectAndMemoize<P extends object>(
  component: ComponentType<P>,
  options?: ConnectOptions<P>
): React.ComponentType<P> {
  const connectedComponent = connect(component, options);
  // Memoizing class components using `React.memo` does not work properly.
  // Instead, class components need to implement `shouldComponentUpdate`.
  // Since we don't have that many class components, we simply don't really memoize them.
  if (isClassComponent(connectedComponent)) return connectedComponent;

  const memoizedComponent = memo(connectedComponent);
  memoizedComponent.displayName = displayNameFromComponent(connectedComponent);

  return memoizedComponent;
}
