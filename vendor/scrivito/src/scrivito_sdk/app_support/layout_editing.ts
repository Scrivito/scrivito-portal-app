import { uiAdapter } from './ui_adapter';

export function isLayoutEditingActive(): boolean {
  return !!uiAdapter?.isLayoutEditingActive();
}
