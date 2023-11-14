// @rewire
import { randomHex, scrollElementIntoView } from 'scrivito_sdk/common';
import { getCurrentPageId } from './get_current_page_id';

export type ScrollTarget = ObjFieldScrollTarget | WidgetScrollTarget;
type RevealCallback = () => void;

interface ObjFieldScrollTarget {
  objId: string;
  attributeName: string;
}

interface WidgetScrollTarget {
  objId: string;
  widgetId: string;
}

export function registerScrollTarget(
  targetId: ScrollTarget,
  element: Element,
  onReveal?: RevealCallback
): () => void {
  const targetKey = keyFor(targetId);
  const id = randomHex();
  const reveal = () => {
    scrollElementIntoView(element, {
      // See https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView for details
      // * Chrome and Firefox support all options
      // * Safari supports the most important options: "block" and "inline" (tested with Safari 12.1.1)
      // * Edge: Unknown
      behavior: 'smooth',
      block: 'center',
      inline: 'center',
    });

    if (onReveal) onReveal();
  };

  const scrollTargets = scrollTargetRegistry[targetKey] || [];
  scrollTargets.push({ id, reveal });
  scrollTargetRegistry[targetKey] = scrollTargets;

  if (requestedTargetId === targetKey) {
    reveal();
    requestedTargetId = '';
  }

  return () => {
    const entries = scrollTargetRegistry[targetKey];
    const remainingEntries = entries?.filter((entry) => entry.id !== id);
    if (remainingEntries?.length) {
      scrollTargetRegistry[targetKey] = remainingEntries;
    } else {
      delete scrollTargetRegistry[targetKey];
    }
  };
}

export function scrollIntoView(targetId: ScrollTarget): void {
  if (targetId.objId !== getCurrentPageId()) return;
  const targetKey = keyFor(targetId);
  const entries = scrollTargetRegistry[targetKey];
  if (entries) {
    entries.forEach((entry) => entry.reveal());
  } else {
    requestedTargetId = targetKey;
  }
}

function keyFor(targetId: {
  objId: string;
  attributeName?: string;
  widgetId?: string;
}): string {
  return [targetId.objId, targetId.attributeName, targetId.widgetId].toString();
}

let scrollTargetRegistry: {
  [key: string]: Array<{ id: string; reveal: RevealCallback }> | undefined;
} = {};

let requestedTargetId: string;

// For test purpose only.
export function resetScrollIntoView() {
  scrollTargetRegistry = {};
  requestedTargetId = '';
}
