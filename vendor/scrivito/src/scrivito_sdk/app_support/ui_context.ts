import { uiAdapter } from 'scrivito_sdk/app_support/ui_adapter';

export interface UiContext {
  theme: UiTheme;
}

export type UiTheme = 'dark' | 'light';

/** @public */
export function uiContext(): UiContext | null {
  return uiAdapter?.getUiContext() || null;
}
