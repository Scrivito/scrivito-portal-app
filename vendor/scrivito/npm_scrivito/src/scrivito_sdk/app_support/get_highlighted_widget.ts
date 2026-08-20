import { uiAdapter } from 'scrivito_sdk/app_support/ui_adapter';
import { HighlightedWidget } from 'scrivito_sdk/app_ui_protocol';

export function getHighlightedWidget(): HighlightedWidget | null {
  return uiAdapter?.getHighlightedWidget() ?? null;
}
