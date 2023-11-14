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
  checkProvideComponent,
} from 'scrivito_sdk/realm';

/** @public */
export function provideComponent<AttrDefs extends AttributeDefinitions>(
  objClass: ObjClass<AttrDefs>,
  component: React.ComponentType<PageComponentProps<AttrDefs>>
): void;

/** @public */
export function provideComponent(
  classNameOrObjClass: string | ObjClass,
  component: React.ComponentType<Partial<PageComponentProps>>
): void;

/** @public */
export function provideComponent<AttrDefs extends AttributeDefinitions>(
  widgetClass: WidgetClass<AttrDefs>,
  component: React.ComponentType<WidgetComponentProps<AttrDefs>>
): void;

/** @public */
export function provideComponent(
  classNameOrWidgetClass: string | WidgetClass,
  component: React.ComponentType<Partial<WidgetComponentProps>>
): void;

/** @internal */
export function provideComponent(
  classNameOrClass: string | ObjClass | WidgetClass,
  component: React.ComponentType,
  ...excessArgs: never[]
): void {
  checkProvideComponent(classNameOrClass, component, ...excessArgs);
  const className = getClassName(classNameOrClass);

  if (isComponentMissingName(component)) {
    component.displayName = className;
  }

  const connectedComponent = connect(component);
  const wrappedComponent = wrapComponent(connectedComponent);

  registerComponentForAppClass(className, wrappedComponent);
}

function wrapComponent(component: React.ComponentType) {
  const wrappedComponent = isClassComponent(component)
    ? wrapClassComponent(component)
    : wrapFunctionComponent(component);

  wrappedComponent.displayName = displayNameFromComponent(component);

  return wrappedComponent;
}

function wrapFunctionComponent<Props extends object>(
  functionComponent: React.FunctionComponent<Props>
): React.FunctionComponent<Props> {
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

function hasWidgetProp(props: {}) {
  return !!(props as { widget?: unknown }).widget;
}

function wrapInWidgetTag<Rendered extends React.ReactNode>(
  rendered: Rendered
): React.ReactElement | Rendered {
  return getElementType(rendered) === WidgetTag
    ? rendered
    : React.createElement(WidgetTag, { children: rendered });
}

export function isComponentMissingName(component: React.ComponentType) {
  // In some browsers functional components are missing the `name` property.
  // In some other browsers they have that property, but the value is meaningless: `_class`.
  return (
    !component.displayName &&
    (!component.name ||
      component.name === '_class' ||
      component.name.substring(0, 6) === 'class_')
  );
}
