import { connect, isClassComponent } from 'scrivito_sdk/react/connect';
import { displayNameFromComponent } from 'scrivito_sdk/react/display_name_from_component';
import { memo } from 'scrivito_sdk/react/memo';

export function connectAndMemoize<P extends object>(
  component: React.ComponentType<P>
): React.ComponentType<P> {
  const connectedComponent = connect(component);
  // Memoizing class components using `React.memo` does not work properly.
  // Instead, class components need to implement `shouldComponentUpdate`.
  // Since we don't have that many class components, we simply don't really memoize them.
  if (isClassComponent(connectedComponent)) return connectedComponent;

  const memoizedComponent = memo(connectedComponent);
  memoizedComponent.displayName = displayNameFromComponent(connectedComponent);

  return memoizedComponent;
}
