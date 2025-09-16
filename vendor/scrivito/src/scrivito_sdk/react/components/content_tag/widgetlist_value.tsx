import * as React from 'react';

import { canEditObjWithId } from 'scrivito_sdk/app_support/can_edit';
import {
  isComparisonActive,
  isInPlaceEditingActive,
} from 'scrivito_sdk/app_support/editing_context';
import { getComparisonRange } from 'scrivito_sdk/app_support/get_comparison_range';
import { InternalError } from 'scrivito_sdk/common';
import { importFrom } from 'scrivito_sdk/import_from';
import { BasicField, getPlacementModificationInfos } from 'scrivito_sdk/models';
import {
  WidgetContent,
  WidgetProps,
  WidgetTagContext,
} from 'scrivito_sdk/react/components/content_tag/widget_content';
import { useInPlaceEditing } from 'scrivito_sdk/react/hooks/use_in_place_editing';
import { connect } from 'scrivito_sdk/react_connect';

interface WidgetlistValueProps {
  field: BasicField<'widgetlist'>;
  widgetProps?: WidgetProps;
}

export const WidgetlistValue = connect(function WidgetlistValue({
  field,
  widgetProps,
}: WidgetlistValueProps) {
  const isInPlaceEditingEnabled = useInPlaceEditing(field.obj());

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
    const { placementModification: containerPlacementModification } =
      React.useContext(WidgetTagContext);

    // Circular diffs should never happen, due to how we fetch the content
    // However, a circular diff will cause an infinite loop and crash the browser
    // This circuit breaker avoids crashing the browser in case we have an internal bug
    const renderingDepth = React.useContext(WidgetlistRenderingDepth) + 1;
    if (renderingDepth >= 100) throw new InternalError();

    const infos = getPlacementModificationInfos(
      field,
      getComparisonRange(),
      containerPlacementModification ?? null
    );

    return (
      <WidgetlistRenderingDepth.Provider value={renderingDepth}>
        {infos.map((info) => {
          return (
            <WidgetContent
              key={calculateKey(info.widget.id(), info.modification)}
              widget={info.widget}
              widgetProps={widgetProps}
              placementModification={info.modification}
              fieldType="widgetlist"
            />
          );
        })}
      </WidgetlistRenderingDepth.Provider>
    );

    function calculateKey(widgetId: string, modification: string | null) {
      return `${widgetId}-${modification ?? 'unmodified'}`;
    }
  }
);

const WidgetlistRenderingDepth = React.createContext<number>(0);

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
