import { uiAdapter } from 'scrivito_sdk/app_support/ui_adapter';
import { equals, onReset } from 'scrivito_sdk/common';
import { BasicWidget } from 'scrivito_sdk/models';

let widgetHighlightingEnabled = false;

export function toggleWidgetHighlighting(value: boolean): void {
  widgetHighlightingEnabled = value;
}

// Exported for test purposes only
export function isWidgetHighlightingEnabled(): boolean {
  return !!widgetHighlightingEnabled;
}

export function isWidgetHighlighted(widget: BasicWidget): boolean {
  if (!isWidgetHighlightingEnabled()) return false;

  const highlightedWidget = uiAdapter?.getHighlightedWidget();

  if (!highlightedWidget) return false;

  return (
    highlightedWidget.objId === widget.obj().id() &&
    highlightedWidget.widgetId === widget.id() &&
    equals(highlightedWidget.objSpaceId, widget.objSpaceId())
  );
}

onReset(() => {
  widgetHighlightingEnabled = false;
});
