// @rewire
import { Streamable } from 'scrivito_sdk/common';
import { createLoadableCollection } from 'scrivito_sdk/loadable';
import { ElementBoundaries } from 'scrivito_sdk/ui_interface';

const registry: ElementRegistry = {};

export function registerElement(elementId: number, element: Element): void {
  registry[elementId] = element;
}

export function unregisterElement(elementId: number): void {
  delete registry[elementId];
}

interface ElementRegistry {
  [elementId: number]: Element | null | undefined;
}

/**
 * Streams `ElementBoundaries` every 1000 ms.
 * Streams `undefined` if the boundaries are not loaded.
 * Streams `null` if element is unknown or has been removed.
 */
export function getElementBoundaries(
  elementId: number
): ElementBoundaries | null | undefined {
  if (!registry[elementId]) {
    return null;
  }

  return elementBoundaries.get(elementId).get();
}

// For test purpose only.
export function getRegisteredElementId(
  element: HTMLElement
): number | undefined {
  for (const key of Object.keys(registry)) {
    const elementId = parseInt(key, 10);

    if (registry[elementId] === element) {
      return elementId;
    }
  }
}

// For test purpose only.
export function calculateElementBoundaries(
  element: Element
): ElementBoundaries {
  const { left, top, width, height } = element.getBoundingClientRect();

  return {
    x: left + window.pageXOffset,
    y: top + window.pageYOffset,
    width,
    height,
  };
}

const elementBoundaries = createLoadableCollection({
  loadElement: (elementId: number) => ({
    stream: new Streamable<ElementBoundaries | null>((subscriber) => {
      const updateElementBoundaries = () => {
        const element = registry[elementId];
        subscriber.next(element ? calculateElementBoundaries(element) : null);
      };

      updateElementBoundaries();
      const intervalId = window.setInterval(updateElementBoundaries, 1000);

      return () => window.clearInterval(intervalId);
    }),
  }),
});
