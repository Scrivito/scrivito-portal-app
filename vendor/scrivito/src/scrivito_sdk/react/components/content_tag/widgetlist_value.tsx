import * as React from 'react';

import { canEditObjWithId } from 'scrivito_sdk/app_support/can_edit';
import {
  isComparisonActive,
  isInPlaceEditingActive,
} from 'scrivito_sdk/app_support/editing_context';
import { getComparisonRange } from 'scrivito_sdk/app_support/get_comparison_range';
import { importFrom } from 'scrivito_sdk/import_from';
import { BasicField, getPlacementModificationInfos } from 'scrivito_sdk/models';
import {
  WidgetContent,
  WidgetProps,
} from 'scrivito_sdk/react/components/content_tag/widget_content';
import { connect } from 'scrivito_sdk/react/connect';
import { InPlaceEditingEnabledContextConsumer } from 'scrivito_sdk/react/in_place_editing_enabled_context';

interface WidgetlistValueProps {
  field: BasicField<'widgetlist'>;
  widgetProps?: WidgetProps;
}

export const WidgetlistValue = connect(function WidgetlistValue({
  field,
  widgetProps,
}: WidgetlistValueProps) {
  if (isComparisonActive()) {
    return widgetlistChildrenForComparison();
  }

  if (!isInPlaceEditingActive() || !canEditObjWithId(field.obj().id())) {
    return renderWidgets(false);
  }

  return (
    <InPlaceEditingEnabledContextConsumer>
      {(isInPlaceEditingEnabled) => renderWidgets(isInPlaceEditingEnabled)}
    </InPlaceEditingEnabledContextConsumer>
  );

  function renderWidgets(isInPlaceEditingEnabled: boolean) {
    const widgets = field.get();
    if (widgets.length) {
      return (
        <>
          {widgets.map((widget) => (
            <WidgetContent
              key={widget.id()}
              widget={widget}
              widgetProps={widgetProps}
              fieldType="widgetlist"
            />
          ))}
        </>
      );
    }

    if (!isInPlaceEditingEnabled) return null;

    const WidgetlistPlaceholder = importFrom(
      'reactEditing',
      'WidgetlistPlaceholder'
    );

    return WidgetlistPlaceholder ? (
      <WidgetlistPlaceholder field={field} />
    ) : null;
  }

  function widgetlistChildrenForComparison() {
    return (
      <>
        {getPlacementModificationInfos(field, getComparisonRange()).map(
          (info) => (
            <WidgetContent
              key={`${info.widget.id()}-${info.modification}`}
              widget={info.widget}
              widgetProps={widgetProps}
              placementModification={info.modification}
              fieldType="widgetlist"
            />
          )
        )}
      </>
    );
  }
});
