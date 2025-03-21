import * as React from 'react';

import { isInPlaceEditingActive } from 'scrivito_sdk/app_support/editing_context';
import { ArgumentError, throwNextTick } from 'scrivito_sdk/common';
import { BasicWidget, PlacementModification } from 'scrivito_sdk/models';
import { getComponentForAppClass } from 'scrivito_sdk/react/component_registry';
import { AutomaticDataContext } from 'scrivito_sdk/react/components/automatic_data_context';
import { WidgetTag } from 'scrivito_sdk/react/components/widget_tag';
import { connectAndMemoize } from 'scrivito_sdk/react/connect_and_memoize';
import {
  AttributeDefinitions,
  Widget,
  wrapInAppClass,
} from 'scrivito_sdk/realm';

export interface WidgetProps {
  [key: string]: unknown;
}

interface WidgetContentProps {
  widget: BasicWidget;
  widgetProps?: WidgetProps;
  placementModification?: PlacementModification;
  fieldType?: WidgetContentFieldType;
}

type WidgetContentFieldType = 'widget' | 'widgetlist';

export const WidgetContent: React.ComponentType<WidgetContentProps> =
  connectAndMemoize(function WidgetContent({
    fieldType,
    placementModification,
    widget,
    widgetProps,
  }: WidgetContentProps) {
    const widgetClass = widget.objClass();
    const widgetComponent = getComponentForAppClass(
      widgetClass
    ) as React.ComponentType<WidgetComponentProps> | null;

    return (
      <WidgetTagContext.Provider
        value={{ widget, placementModification, fieldType }}
      >
        <WidgetContentErrorBoundary
          widget={widget}
          widgetClass={widgetClass}
          widgetComponent={widgetComponent}
          widgetProps={widgetProps}
        />
      </WidgetTagContext.Provider>
    );
  });
WidgetContent.displayName = 'Scrivito.ContentTag.WidgetContent';

class WidgetContentErrorBoundary extends React.Component<
  AppWidgetWrapperProps,
  { hasError: boolean }
> {
  constructor(props: AppWidgetWrapperProps) {
    super(props);

    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(e: Error) {
    throwNextTick(e);
  }

  componentDidUpdate(prevProps: AppWidgetWrapperProps) {
    if (prevProps.widgetComponent !== this.props.widgetComponent) {
      this.setState({ hasError: false });
    }
  }

  render() {
    if (this.state.hasError) {
      if (isInPlaceEditingActive()) {
        return (
          <WidgetTag>
            <div className="content_error">
              Widget could not be rendered due to application error.
            </div>
          </WidgetTag>
        );
      }

      return <WidgetTag />;
    }

    return <AppWidgetWrapper {...this.props} />;
  }
}

interface AppWidgetWrapperProps {
  widget: BasicWidget;
  widgetClass: string;
  widgetComponent: React.ComponentType<WidgetComponentProps> | null;
  widgetProps?: WidgetProps;
}

/** @public */
export interface WidgetComponentProps<
  AttrDefs extends AttributeDefinitions = AttributeDefinitions
> {
  widget: Widget<AttrDefs>;
}

function AppWidgetWrapper({
  widget,
  widgetClass,
  widgetComponent,
  widgetProps,
}: AppWidgetWrapperProps) {
  if (!widgetComponent) {
    throw new ArgumentError(
      `No component registered for widget class "${widgetClass}"`
    );
  }

  if (widgetProps?.hasOwnProperty('widget')) {
    throwNextTick(
      new ArgumentError('The prop "widget" is not allowed inside "widgetProps"')
    );
  }
  const widgetComponentProps: WidgetComponentProps = {
    ...widgetProps,
    widget: wrapInAppClass(widget),
  };

  return (
    <AutomaticDataContext content={widget}>
      {React.createElement<WidgetComponentProps>(
        widgetComponent,
        widgetComponentProps
      )}
    </AutomaticDataContext>
  );
}

interface WidgetTagContextValue {
  widget?: BasicWidget;
  placementModification?: PlacementModification;
  fieldType?: WidgetContentFieldType;
}

export const WidgetTagContext = React.createContext<WidgetTagContextValue>({});
