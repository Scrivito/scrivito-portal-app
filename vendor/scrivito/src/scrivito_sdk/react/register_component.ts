import * as React from 'react';

import { registerComponentForId } from 'scrivito_sdk/react/component_registry';
import { connect } from 'scrivito_sdk/react/connect';
import { Obj, Widget } from 'scrivito_sdk/realm';

/** @public */
export function registerComponent<
  P extends
    | Partial<CustomPageComponentProps>
    | Partial<CustomWidgetComponentProps>
>(componentId: string, component: React.ComponentType<P>): void {
  registerComponentForId(componentId, connect(component));
}

/** @public */
export interface CustomPageComponentProps {
  obj: Obj;
  page: Obj;
}

/** @public */
export interface CustomWidgetComponentProps {
  widget: Widget;
}
