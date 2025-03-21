import { uiAdapter } from 'scrivito_sdk/app_support/ui_adapter';
import { LoadableData, createLoadableCollection } from 'scrivito_sdk/loadable';

// the modules that can be loaded using importFrom
const moduleLoaders = {
  reactEditing: () => import('scrivito_sdk/react_editing'),
  editingSupport: () => import('scrivito_sdk/editing_support'),
};

export type EditingModuleName = keyof typeof moduleLoaders;

// a type that maps from module names to module types
export type EditingModules = {
  [ModuleName in EditingModuleName]: AsyncReturnType<
    (typeof moduleLoaders)[ModuleName]
  >;
};

const loadableModules = createLoadableCollection<
  EditingModules[EditingModuleName],
  EditingModuleName
>({
  loadElement: (moduleName) => ({ loader: moduleLoaders[moduleName] }),
});

/** get the given symbol from the given package, if inside the UI.
 *
 * returns undefined, if not inside the UI, or while loading the module has not yet finished.
 */
export function importFrom<
  ModuleName extends EditingModuleName,
  Symbol extends keyof EditingModules[ModuleName]
>(
  moduleName: ModuleName,
  symbol: Symbol
): EditingModules[ModuleName][Symbol] | undefined {
  if (!uiAdapter) return;

  // cast helps TS understand that a specific moduleName leads to a specific module type
  const loadable = loadableModules.get(moduleName) as LoadableData<
    EditingModules[ModuleName]
  >;

  const loadedModule = loadable.get();
  if (!loadedModule) return;

  // this cast should not be needed, but ts 4.4. seems buggy...
  return (loadedModule as EditingModules[ModuleName])[symbol];
}

// for test purposes only
export function provideLoadedEditingModule<
  ModuleName extends EditingModuleName
>(moduleName: ModuleName, editingModule: EditingModules[ModuleName]): void {
  loadableModules.get(moduleName).set(editingModule);
}

// for test purposes only
export function isEditingModuleBeingLoaded<
  ModuleName extends EditingModuleName
>(moduleName: ModuleName): boolean {
  return loadableModules.get(moduleName).numSubscribers() > 0;
}

type PromiseType<T> = T extends Promise<infer U> ? U : T;
type AsyncReturnType<T extends (...args: unknown[]) => unknown> = PromiseType<
  ReturnType<T>
>;
