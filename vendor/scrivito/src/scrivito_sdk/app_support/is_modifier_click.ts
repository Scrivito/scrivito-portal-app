import { MouseEvent } from 'react';

export function isModifierClick(event: MouseEvent) {
  return event.ctrlKey || event.metaKey || event.shiftKey;
}
