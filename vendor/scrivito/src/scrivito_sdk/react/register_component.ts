import {
  CustomPageComponentProps,
  CustomWidgetComponentProps,
} from 'scrivito_sdk/app_support/custom_component_props';
import { registerComponentForId } from 'scrivito_sdk/react/component_registry';
import { ComponentType } from 'scrivito_sdk/react/provide_component';
import { connect } from 'scrivito_sdk/react_connect';

/** @public */
export function registerComponent<
  P extends
    | Partial<CustomPageComponentProps>
    | Partial<CustomWidgetComponentProps>,
>(componentId: string, component: ComponentType<P>): void {
  registerComponentForId(componentId, connect(component));
}
