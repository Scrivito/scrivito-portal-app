// @rewire
import * as React from 'react';

import { shouldContentTagsForEmptyAttributesBeSkipped } from 'scrivito_sdk/app_support/content_tags_for_empty_attributes';
import {
  isComparisonActive,
  isInPlaceEditingActive,
} from 'scrivito_sdk/app_support/editing_context';
import { getComparisonRange } from 'scrivito_sdk/app_support/get_comparison_range';
import {
  ArgumentError,
  isEmptyValue,
  throwNextTick,
} from 'scrivito_sdk/common';
import {
  DataContext,
  DataItem,
  DataScope,
} from 'scrivito_sdk/data_integration';
import { importFrom } from 'scrivito_sdk/import_from';
import { BasicField, CmsAttributeType } from 'scrivito_sdk/models';
import { AttributeValue } from 'scrivito_sdk/react/components/content_tag/attribute_value';
import { WidgetProps } from 'scrivito_sdk/react/components/content_tag/widget_content';
import { ProvidePlaceholders } from 'scrivito_sdk/react/data_context_container';
import { useInPlaceEditing } from 'scrivito_sdk/react/hooks/use_in_place_editing';
import { ComponentType } from 'scrivito_sdk/react/provide_component';
import { connect } from 'scrivito_sdk/react_connect';
import {
  AttributeDefinitions,
  Obj,
  Schema,
  Widget,
  unwrapAppClass,
} from 'scrivito_sdk/realm';

export interface ContentTagProps<
  AttrDefs extends AttributeDefinitions = AttributeDefinitions
> {
  tag?: string;
  content: Obj<AttrDefs> | Widget<AttrDefs> | null;
  attribute: keyof AttrDefs & string;
  dataContext?: DataContext | Obj | DataItem | DataScope | null;
  widgetProps?: WidgetProps;
  renderEmptyAttribute?: boolean;

  ref?: React.Ref<Element>;

  [key: string]: unknown;
}

type ContentTagType = {
  <AttrDefs extends AttributeDefinitions = AttributeDefinitions>(
    props: ContentTagProps<AttrDefs>
  ): React.ReactElement | null;

  /** @internal */
  displayName?: string;
};

type ContentTagWithElementCallbackProps = ContentTagProps & {
  elementCallback?: (element?: HTMLElement) => void;
};

export const ContentTagWithElementCallback: ComponentType<ContentTagWithElementCallbackProps> =
  connect(function ContentTagWithElementCallback({
    content,
    attribute,
    tag,
    dataContext,
    widgetProps,
    elementCallback,
    renderEmptyAttribute,
    ref,
    ...customProps
  }: ContentTagWithElementCallbackProps) {
    const isInPlaceEditingEnabled = useInPlaceEditing(
      unwrapAppClass(content)?.obj() ?? null
    );

    if (!content) return null;

    const field = getField(content, attribute);
    if (!field) return null;

    if (isComparisonActive()) {
      const [fromField, toField] = getFieldsForComparison(field);

      if (shouldComparisonBeSkipped(fromField, toField, renderEmptyAttribute)) {
        return null;
      }
    }

    if (
      (!isInPlaceEditingActive() || !isInPlaceEditingEnabled) &&
      !isComparisonActive() &&
      isEmptyValue(field.get()) &&
      renderNothingForEmptyAttribute(renderEmptyAttribute)
    ) {
      return null;
    }

    assertWidgetPropsAreAllowed(widgetProps, field);

    const contentTagProps = {
      elementCallback,
      field,
      tag: tag || 'div',
      customProps,
      widgetProps,
      ref,
    };

    const AttributeValueWithEditing = importFrom(
      'reactEditing',
      'AttributeValueWithEditing'
    );

    const AttributeValueComponent = AttributeValueWithEditing || AttributeValue;
    const attributeValue = <AttributeValueComponent {...contentTagProps} />;

    if (
      isDataContextObject(dataContext) &&
      (dataContext._class || dataContext._id)
    ) {
      throwNextTick(
        new ArgumentError(
          'The object provided via "dataContext" prop must not contain keys "_class" and "_id"'
        )
      );

      return attributeValue;
    }

    if (!dataContext) return attributeValue;

    return (
      <ProvidePlaceholders source={dataContext}>
        {attributeValue}
      </ProvidePlaceholders>
    );
  });

function getField<AttrDefs extends AttributeDefinitions = AttributeDefinitions>(
  content: Obj<AttrDefs> | Widget<AttrDefs>,
  attribute: keyof AttrDefs & string
) {
  const field = Schema.basicFieldFor(content, attribute);
  if (field) return field;

  throwNextTick(
    new ArgumentError(
      'Component "Scrivito.ContentTag" received prop "attribute" with invalid value: ' +
        `Attribute "${attribute}" is not defined for content specified in prop "content".`
    )
  );

  return null;
}

function getFieldsForComparison<T extends CmsAttributeType>(
  field: BasicField<T>
) {
  return getComparisonRange().map((objSpace) => field.inObjSpace(objSpace));
}

function assertWidgetPropsAreAllowed<T extends CmsAttributeType>(
  widgetProps: WidgetProps | undefined,
  field: BasicField<T>
) {
  if (!widgetProps) return;

  const fieldType = field.type();

  if (!(fieldType === 'widget' || fieldType === 'widgetlist')) {
    throwNextTick(
      new ArgumentError(
        'The prop "widgetProps" is only allowed for widget and widgetlist attributes'
      )
    );
  }
}

function shouldComparisonBeSkipped<T extends CmsAttributeType>(
  fromField: BasicField<T> | null,
  toField?: BasicField<T> | null,
  renderEmptyAttribute?: boolean
) {
  return (
    isEmptyValue(fromField?.get()) &&
    isEmptyValue(toField?.get()) &&
    renderNothingForEmptyAttribute(renderEmptyAttribute)
  );
}

/** @public */
export const ContentTag = connect(
  ContentTagWithElementCallback
) as ContentTagType;
ContentTag.displayName = 'Scrivito.ContentTag';

function isDataContextObject(
  dataContext: DataContext | DataScope | DataItem | Obj | null | undefined
): dataContext is DataContext {
  return (
    !!dataContext &&
    !(dataContext instanceof DataItem) &&
    !(dataContext instanceof DataScope) &&
    !(dataContext instanceof Obj)
  );
}

function renderNothingForEmptyAttribute(renderEmptyAttribute?: boolean) {
  return renderEmptyAttribute === undefined
    ? shouldContentTagsForEmptyAttributesBeSkipped()
    : !renderEmptyAttribute;
}
