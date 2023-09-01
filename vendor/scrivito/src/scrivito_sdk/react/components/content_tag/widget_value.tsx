import * as React from 'react';

import { canEditObjWithId } from 'scrivito_sdk/app_support/can_edit';
import {
  isComparisonActive,
  isInPlaceEditingActive,
} from 'scrivito_sdk/app_support/editing_context';
import { InternalError } from 'scrivito_sdk/common';
import { importFrom } from 'scrivito_sdk/import_from';
import { BasicField } from 'scrivito_sdk/models';
import {
  WidgetContent,
  WidgetProps,
} from 'scrivito_sdk/react/components/content_tag/widget_content';
import { connect } from 'scrivito_sdk/react/connect';
import { useLayoutAwareInPlaceEditing } from 'scrivito_sdk/react/use_layout_aware_in_place_editing';

export const WidgetValue = connect(function WidgetValue({
  field,
  widgetProps,
}: {
  field: BasicField<'widget'>;
  widgetProps?: WidgetProps;
}) {
  const isInPlaceEditingEnabled = useLayoutAwareInPlaceEditing();

  if (isComparisonActive()) throw new InternalError('Not yet implemented');

  if (!isInPlaceEditingActive() || !canEditObjWithId(field.obj().id())) {
    return (
      <WidgetValueContent
        field={field}
        widgetProps={widgetProps}
        isInPlaceEditingEnabled={false}
      />
    );
  }

  return (
    <WidgetValueContent
      field={field}
      widgetProps={widgetProps}
      isInPlaceEditingEnabled={isInPlaceEditingEnabled}
    />
  );
});

const WidgetValueContent = connect(function WidgetValueContent({
  field,
  widgetProps,
  isInPlaceEditingEnabled,
}: {
  field: BasicField<'widget'>;
  widgetProps?: WidgetProps;
  isInPlaceEditingEnabled: boolean;
}) {
  const widget = field.get();

  if (widget) {
    return (
      <WidgetContent
        key={widget.id()}
        widget={widget}
        widgetProps={widgetProps}
        fieldType="widget"
      />
    );
  }

  if (!isInPlaceEditingEnabled) return null;

  const WidgetPlaceholder = importFrom('reactEditing', 'WidgetPlaceholder');

  return WidgetPlaceholder ? <WidgetPlaceholder field={field} /> : null;
});
