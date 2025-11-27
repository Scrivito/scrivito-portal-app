import * as React from 'react';

import { getClassName } from 'scrivito_sdk/app_support/get_class_name';
import { registerComponentForAppClass } from 'scrivito_sdk/react/component_registry';
import { WidgetComponentProps } from 'scrivito_sdk/react/components/content_tag/widget_content';
import { WidgetTag } from 'scrivito_sdk/react/components/widget_tag';
import { PageComponentProps } from 'scrivito_sdk/react/get_component_for_page_class';
import { memo } from 'scrivito_sdk/react/memo';
import {
  connect,
  displayNameFromComponent,
  getElementType,
  isClassComponent,
} from 'scrivito_sdk/react_connect';
import {
  AttributeDefinitions,
  ObjClass,
  WidgetClass,
} from 'scrivito_sdk/realm';

export type SyncFunctionComponent<P = object> = {
  (props: P): React.ReactNode;
  displayName?: string | undefined;
};

export type ComponentType<P = object> =
  | React.ComponentClass<P>
  | SyncFunctionComponent<P>;

export interface ProvidedComponentOptions<Props> {
  loading?: ComponentType<Props>;
}

/** @public */
export function provideComponent<AttrDefs extends AttributeDefinitions>(
  objClass: ObjClass<AttrDefs>,
  component: ComponentType<PageComponentProps<AttrDefs>>,
  options?: ProvidedComponentOptions<PageComponentProps<AttrDefs>>
): void;

/** @public */
export function provideComponent(
  classNameOrObjClass: string | ObjClass,
  component: ComponentType<Partial<PageComponentProps>>,
  options?: ProvidedComponentOptions<Partial<PageComponentProps>>
): void;

/** @public */
export function provideComponent<AttrDefs extends AttributeDefinitions>(
  widgetClass: WidgetClass<AttrDefs>,
  component: ComponentType<WidgetComponentProps<AttrDefs>>,
  options?: ProvidedComponentOptions<WidgetComponentProps<AttrDefs>>
): void;

/** @public */
export function provideComponent(
  classNameOrWidgetClass: string | WidgetClass,
  component: ComponentType<Partial<WidgetComponentProps>>,
  options?: ProvidedComponentOptions<Partial<WidgetComponentProps>>
): void;

/** @internal */
export function provideComponent(
  classNameOrClass: string | ObjClass | WidgetClass,
  component: ComponentType,
  options?: { loading?: typeof component }
): void {
  const className = getClassName(classNameOrClass);

  if (isComponentMissingName(component)) {
    component.displayName = className;
  }

  const connectedComponent = connect(component, options);
  const wrappedComponent = wrapComponent(connectedComponent);

  registerComponentForAppClass(className, wrappedComponent);
}

function wrapComponent(component: ComponentType) {
  const wrappedComponent = isClassComponent(component)
    ? wrapClassComponent(component)
    : wrapFunctionComponent(component);

  wrappedComponent.displayName = displayNameFromComponent(component);

  return wrappedComponent;
}

function wrapFunctionComponent<Props extends object>(
  functionComponent: SyncFunctionComponent<Props>
): SyncFunctionComponent<Props> {
  return memo((props: Props) => {
    return hasWidgetProp(props)
      ? wrapInWidgetTag(functionComponent(props))
      : functionComponent(props);
  });
}

function wrapClassComponent(component: React.ComponentClass) {
  return class extends component {
    render() {
      return hasWidgetProp(this.props)
        ? wrapInWidgetTag(super.render())
        : super.render();
    }
  };
}

function hasWidgetProp(props: object) {
  return !!(props as { widget?: unknown }).widget;
}

function wrapInWidgetTag<Rendered extends React.ReactNode>(
  rendered: Rendered
): React.ReactElement | Rendered {
  return getElementType(rendered) === WidgetTag
    ? rendered
    : React.createElement(WidgetTag, { children: rendered });
}

export function isComponentMissingName(component: ComponentType) {
  // In some browsers functional components are missing the `name` property.
  // In some other browsers they have that property, but the value is meaningless: `_class`.
  return (
    !component.displayName &&
    (!component.name ||
      component.name === '_class' ||
      component.name.substring(0, 6) === 'class_')
  );
}
