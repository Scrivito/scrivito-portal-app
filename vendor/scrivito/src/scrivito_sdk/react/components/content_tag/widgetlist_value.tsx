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
import { useLayoutAwareInPlaceEditing } from 'scrivito_sdk/react/hooks/use_layout_aware_in_place_editing';
import { connect } from 'scrivito_sdk/react_connect';

interface WidgetlistValueProps {
  field: BasicField<'widgetlist'>;
  widgetProps?: WidgetProps;
}

export const WidgetlistValue = connect(function WidgetlistValue({
  field,
  widgetProps,
}: WidgetlistValueProps) {
  const isInPlaceEditingEnabled = useLayoutAwareInPlaceEditing();

  if (isComparisonActive()) {
    return (
      <WidgetlistValueContentForComparison
        field={field}
        widgetProps={widgetProps}
      />
    );
  }

  if (!isInPlaceEditingActive() || !canEditObjWithId(field.obj().id())) {
    return (
      <WidgetlistValueContent
        field={field}
        widgetProps={widgetProps}
        isInPlaceEditingEnabled={false}
      />
    );
  }

  return (
    <WidgetlistValueContent
      field={field}
      widgetProps={widgetProps}
      isInPlaceEditingEnabled={isInPlaceEditingEnabled}
    />
  );
});

const WidgetlistValueContentForComparison = connect(
  function WidgetlistValueContentForComparison({
    field,
    widgetProps,
  }: {
    field: BasicField<'widgetlist'>;
    widgetProps?: WidgetProps;
  }) {
    return (
      <>
        {getPlacementModificationInfos(field, getComparisonRange()).map(
          (info) => (
            <WidgetContent
              key={calculateKey(info.widget.id(), info.modification)}
              widget={info.widget}
              widgetProps={widgetProps}
              placementModification={info.modification}
              fieldType="widgetlist"
            />
          )
        )}
      </>
    );

    function calculateKey(widgetId: string, modification: string | null) {
      return `${widgetId}-${modification ?? 'unmodified'}`;
    }
  }
);

const WidgetlistValueContent = connect(function WidgetlistValueContent({
  field,
  widgetProps,
  isInPlaceEditingEnabled,
}: {
  field: BasicField<'widgetlist'>;
  widgetProps?: WidgetProps;
  isInPlaceEditingEnabled: boolean;
}) {
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

  return WidgetlistPlaceholder ? <WidgetlistPlaceholder field={field} /> : null;
});
