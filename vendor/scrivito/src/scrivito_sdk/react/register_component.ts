import { registerComponentForId } from 'scrivito_sdk/react/component_registry';
import { ComponentType } from 'scrivito_sdk/react/provide_component';
import { connect } from 'scrivito_sdk/react_connect';
import { Obj, Widget } from 'scrivito_sdk/realm';

/** @public */
export function registerComponent<
  P extends
    | Partial<CustomPageComponentProps>
    | Partial<CustomWidgetComponentProps>
>(componentId: string, component: ComponentType<P>): void {
  registerComponentForId(componentId, connect(component));
}

/** @public */
export interface CustomPageComponentProps {
  obj: Obj;
  page: Obj;
  attributeName?: string;
}

/** @public */
export interface CustomWidgetComponentProps {
  widget: Widget;
  attributeName?: string;
}
