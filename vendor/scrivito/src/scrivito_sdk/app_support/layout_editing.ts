import { uiAdapter } from './ui_adapter';

export function isLayoutEditingActive(): boolean | null {
  if (!uiAdapter) return false;

  const isActive = uiAdapter.isLayoutEditingActive();
  if (isActive === undefined) return false;

  return isActive;
}
