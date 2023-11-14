import { nextTick } from 'scrivito_sdk/common';
import { createStateContainer } from 'scrivito_sdk/state';
import { ContentReference, ContentZoneData } from 'scrivito_sdk/ui_interface';

interface ContentZoneRegistry {
  [elementId: number]: {
    content: ContentReference;
    parentElementId?: number;
  };
}

export type UnregisterContentZone = () => void;

export function registerContentZone(
  elementId: number,
  content: ContentReference,
  parentElementId?: number
): UnregisterContentZone {
  nextTick(() =>
    updateRegistry((registry) => {
      registry[elementId] = {
        content,
        parentElementId,
      };
    })
  );

  return () =>
    nextTick(() =>
      updateRegistry((registry) => {
        delete registry[elementId];
      })
    );
}

export function getContentZoneData(): ContentZoneData[] {
  const registry = getRegistry();

  return Object.keys(registry).map((key) => {
    const elementId = parseInt(key, 10);

    return {
      elementId,
      ...registry[elementId],
    };
  });
}

const state = createStateContainer<ContentZoneRegistry>();

function updateRegistry(update: (registry: ContentZoneRegistry) => void) {
  const registry = { ...getRegistry() };
  update(registry);
  state.set(registry);
}

function getRegistry() {
  return state.get() || {};
}
