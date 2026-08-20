import { registerDataErrorComponent } from 'scrivito_sdk/react/component_registry';
import { connectAndMemoize } from 'scrivito_sdk/react/connect_and_memoize';
import { ComponentType } from 'scrivito_sdk/react/provide_component';

/** @beta */
export function provideDataErrorComponent(component: ComponentType): void {
  registerDataErrorComponent(connectAndMemoize(component));
}
