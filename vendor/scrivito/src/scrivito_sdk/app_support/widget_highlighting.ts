import { uiAdapter } from 'scrivito_sdk/app_support/ui_adapter';
import { equals } from 'scrivito_sdk/common';
import { BasicWidget } from 'scrivito_sdk/models';

export function isWidgetHighlighted(widget: BasicWidget): boolean {
  const highlightedWidget = uiAdapter?.getHighlightedWidget();

  if (!highlightedWidget) return false;

  return (
    highlightedWidget.objId === widget.obj().id() &&
    highlightedWidget.widgetId === widget.id() &&
    equals(highlightedWidget.objSpaceId, widget.objSpaceId())
  );
}
