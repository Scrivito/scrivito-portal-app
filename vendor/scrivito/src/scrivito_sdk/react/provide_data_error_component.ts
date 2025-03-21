import { registerDataErrorComponent } from 'scrivito_sdk/react/component_registry';
import { connectAndMemoize } from 'scrivito_sdk/react/connect_and_memoize';

/** @beta */
export function provideDataErrorComponent(
  component: React.ComponentType
): void {
  registerDataErrorComponent(connectAndMemoize(component));
}
