import { getClassName } from 'scrivito_sdk/app_support/get_class_name';
import { throwInvalidArgumentsError } from 'scrivito_sdk/common';
import { registerLayoutComponentForAppClass } from 'scrivito_sdk/react/component_registry';
import { connectAndMemoize } from 'scrivito_sdk/react/connect_and_memoize';
import { isComponentMissingName } from 'scrivito_sdk/react/provide_component';
import {
  AttributeDefinitions,
  Obj,
  ObjClass,
  checkProvideLayoutComponent,
  isObjClass,
} from 'scrivito_sdk/realm';

/** @public */
export function provideLayoutComponent<AttrDefs extends AttributeDefinitions>(
  objClass: ObjClass<AttrDefs>,
  component: React.ComponentType<{ page: Obj<AttrDefs> }>
): void;

/** @public */
export function provideLayoutComponent(
  objClass: ObjClass,
  component: React.ComponentType
): void;

/** @internal */
export function provideLayoutComponent(
  objClass: ObjClass,
  component: React.ComponentType,
  ...excessArgs: never[]
): void {
  checkProvideLayoutComponent(objClass, component, ...excessArgs);

  if (!isObjClass(objClass)) {
    throwInvalidArgumentsError(
      'provideLayoutComponent',
      'A layout component must be provided only for Objs',
      { docPermalink: 'js-sdk/provideLayoutComponent' }
    );
  }

  const className = getClassName(objClass);
  if (isComponentMissingName(component)) component.displayName = className;

  registerLayoutComponentForAppClass(className, connectAndMemoize(component));
}
