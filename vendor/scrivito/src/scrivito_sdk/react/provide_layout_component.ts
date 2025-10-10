import { getClassName } from 'scrivito_sdk/app_support/get_class_name';
import { throwInvalidArgumentsError } from 'scrivito_sdk/common';
import { registerLayoutComponentForAppClass } from 'scrivito_sdk/react/component_registry';
import { connectAndMemoize } from 'scrivito_sdk/react/connect_and_memoize';
import {
  ComponentType,
  ProvidedComponentOptions,
  isComponentMissingName,
} from 'scrivito_sdk/react/provide_component';
import {
  AttributeDefinitions,
  Obj,
  ObjClass,
  isObjClass,
} from 'scrivito_sdk/realm';

interface LayoutComponentProps<
  AttrDefs extends AttributeDefinitions = AttributeDefinitions
> {
  page: Obj<AttrDefs>;
}

/** @public */
export function provideLayoutComponent<
  AttrDefs extends AttributeDefinitions = AttributeDefinitions
>(
  objClass: ObjClass<AttrDefs>,
  component: ComponentType<LayoutComponentProps<AttrDefs>>,
  options?: ProvidedComponentOptions<LayoutComponentProps<AttrDefs>>
): void;

/** @public */
export function provideLayoutComponent(
  objClass: ObjClass,
  component: ComponentType,
  options?: ProvidedComponentOptions<LayoutComponentProps>
): void;

/** @internal */
export function provideLayoutComponent(
  objClass: ObjClass,
  component: ComponentType,
  options?: { loading?: typeof component }
): void {
  if (!isObjClass(objClass)) {
    throwInvalidArgumentsError(
      'provideLayoutComponent',
      'A layout component must be provided only for Objs',
      { docPermalink: 'js-sdk/provideLayoutComponent' }
    );
  }

  const className = getClassName(objClass);
  if (isComponentMissingName(component)) component.displayName = className;

  registerLayoutComponentForAppClass(
    className,
    connectAndMemoize(component, options)
  );
}
