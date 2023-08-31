import { Obj } from 'scrivito_sdk/realm';
import { createStateContainer } from 'scrivito_sdk/state';

const registry = new Map<string, React.ComponentType>();
const componentsChangesCounterState = createStateContainer<{
  [componentId: string]: number;
}>();

export function registerComponentForId(
  componentId: string,
  componentClass: React.ComponentType
): void {
  registry.set(componentId, componentClass);

  const componentChangesCounter = getComponentChangesCounterState(componentId);
  const changesCounter = componentChangesCounter.get() ?? 0;
  componentChangesCounter.set(changesCounter + 1);
}

export function getComponentForId(
  componentId: string
): React.ComponentType | null {
  getComponentChangesCounterState(componentId).get();

  return registry.get(componentId) || null;
}

export function registerComponentForAppClass(
  className: string,
  componentClass: React.ComponentType
): void {
  registerComponentForId(componentAppClassId(className), componentClass);
}

export function registerDataErrorComponent(
  componentClass: React.ComponentType
): void {
  registerComponentForId('dataErrorComponent', componentClass);
}

export function getComponentForAppClass(
  className: string
): React.ComponentType | null {
  return getComponentForId(componentAppClassId(className));
}

export function getDataErrorComponent(): React.ComponentType | null {
  return getComponentForId('dataErrorComponent');
}

function getComponentChangesCounterState(componentId: string) {
  return componentsChangesCounterState.subState(componentId);
}

function componentAppClassId(className: string) {
  return `componentForAppClass-${className}`;
}

const layoutRegistry = new Map<string, React.ComponentType>();
const layoutsChangesCounterState = createStateContainer<{
  [componentId: string]: number;
}>();

export function getLayoutComponentForAppClass(
  className: string
): React.ComponentType | React.ComponentType<{ page: Obj }> | null {
  getLayoutChangesCounterState(className).get();

  return layoutRegistry.get(className) || null;
}

export function registerLayoutComponentForAppClass(
  className: string,
  componentClass: React.ComponentType
): void {
  layoutRegistry.set(className, componentClass);

  const layoutChangesCounter = getLayoutChangesCounterState(className);
  const changesCounter = layoutChangesCounter.get() ?? 0;
  layoutChangesCounter.set(changesCounter + 1);

  if (!layoutComponentsStoredState.get()) {
    layoutComponentsStoredState.set(true);
  }
}

const layoutComponentsStoredState = createStateContainer<boolean>();

export function areLayoutComponentsStored() {
  return layoutComponentsStoredState.get() ?? false;
}

function getLayoutChangesCounterState(className: string) {
  return layoutsChangesCounterState.subState(className);
}

// For test purpose only.
export function clearComponentRegistry(): void {
  registry.clear();
  layoutRegistry.clear();
}
