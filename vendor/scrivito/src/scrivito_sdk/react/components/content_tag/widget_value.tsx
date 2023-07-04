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
import { InPlaceEditingEnabledContextConsumer } from 'scrivito_sdk/react/in_place_editing_enabled_context';

export const WidgetValue = connect(function WidgetValue({
  field,
  widgetProps,
}: {
  field: BasicField<'widget'>;
  widgetProps?: WidgetProps;
}) {
  if (isComparisonActive()) throw new InternalError('Not yet implemented');

  if (!isInPlaceEditingActive() || !canEditObjWithId(field.obj().id())) {
    return renderWidget(false);
  }

  return (
    <InPlaceEditingEnabledContextConsumer>
      {(isInPlaceEditingEnabled) => renderWidget(isInPlaceEditingEnabled)}
    </InPlaceEditingEnabledContextConsumer>
  );

  function renderWidget(isInPlaceEditingEnabled: boolean) {
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
  }
});
