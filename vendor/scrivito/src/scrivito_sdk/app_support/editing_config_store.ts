import { EditingConfig } from 'scrivito_sdk/app_support/editing_config';
import { onReset } from 'scrivito_sdk/common';
import { StateContainer, createStateContainer } from 'scrivito_sdk/state';

class EditingConfigStore {
  private updateCounter: StateContainer<number>;
  private store: { [className: string]: EditingConfig };

  constructor() {
    this.store = {};
    this.updateCounter = createStateContainer();
  }

  set(key: string, value: EditingConfig): void {
    this.store[key] = value;
    this.incrementUpdateCounter();
  }

  get(key: string): EditingConfig | undefined {
    this.updateCounter.get();
    return this.store[key];
  }

  clear(): void {
    this.store = {};
    this.incrementUpdateCounter();
  }

  private incrementUpdateCounter() {
    this.updateCounter.set((this.updateCounter.get() || 0) + 1);
  }
}

const editingConfigStore = new EditingConfigStore();

export function setEditingConfigFor(
  className: string,
  editingConfig: EditingConfig
): void {
  editingConfigStore.set(className, editingConfig);
}

export function getEditingConfigFor(
  className: string
): EditingConfig | undefined {
  return editingConfigStore.get(className);
}

onReset(() => editingConfigStore.clear());
