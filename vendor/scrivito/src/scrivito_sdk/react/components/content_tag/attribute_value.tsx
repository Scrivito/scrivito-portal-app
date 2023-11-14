import escape from 'lodash-es/escape';
import isObject from 'lodash-es/isObject';

import * as React from 'react';

import * as BrowserLocation from 'scrivito_sdk/app_support/browser_location';
import { openInNewWindow } from 'scrivito_sdk/app_support/change_location';
import { isComparisonActive } from 'scrivito_sdk/app_support/editing_context';
import {
  OpenInCurrentWindow,
  OpenInNewWindow,
  findClickTarget,
  isOpenInNewWindow,
} from 'scrivito_sdk/app_support/find_click_target';
import { getComparisonRange } from 'scrivito_sdk/app_support/get_comparison_range';
import { replaceInternalLinks } from 'scrivito_sdk/app_support/replace_internal_links';
import { registerScrollTarget } from 'scrivito_sdk/app_support/scroll_into_view';
import { uiAdapter } from 'scrivito_sdk/app_support/ui_adapter';
import { replacePlaceholdersWithData } from 'scrivito_sdk/data_integration';
import { AttributeType, BasicField } from 'scrivito_sdk/models';
import { WidgetProps } from 'scrivito_sdk/react/components/content_tag/widget_content';
import { WidgetValue } from 'scrivito_sdk/react/components/content_tag/widget_value';
import { WidgetlistValue } from 'scrivito_sdk/react/components/content_tag/widgetlist_value';
import {
  DataContextContainer,
  useDataContextContainer,
} from 'scrivito_sdk/react/data_context_container';
import { withDisplayName } from 'scrivito_sdk/react/with_display_name';
import { connect } from 'scrivito_sdk/react_connect';

export interface AttributeValueProps<Type extends AttributeType> {
  customProps: {
    [key: string]: unknown;
    children?: React.ReactNode;
    dangerouslySetInnerHTML?: { __html: string };
    onClick?: <T>(e: React.MouseEvent<T>) => void;
  };
  field: BasicField<Type>;
  onClick?: <T extends {}>(e: React.MouseEvent<T>) => void;
  tag: string;
  widgetProps?: WidgetProps;
  elementCallback?: (element?: HTMLElement) => void;
}

export const AttributeValue = connect(
  withDisplayName(
    'Scrivito.ContentTag.AttributeValue',
    <Type extends AttributeType>(props: AttributeValueProps<Type>) => {
      const dataContextContainer = useDataContextContainer();
      const element = React.useRef<HTMLElement>();

      React.useEffect(() => {
        if (!element.current) return;
        const objId = props.field.obj().id();
        const attributeName = props.field.name();

        return registerScrollTarget({ objId, attributeName }, element.current);
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [props.field.obj().id(), props.field.name(), element.current]);

      const {
        children: customChildrenFromProps,
        dangerouslySetInnerHTML: maybeCustomInnerHtml,
        ...customProps
      } = props.customProps;

      const renderProps = renderPropsForField(
        props.field,
        customChildrenFromProps,
        isCustomInnerHtml(maybeCustomInnerHtml)
          ? maybeCustomInnerHtml
          : undefined,
        props.customProps.onClick,
        props.widgetProps,
        dataContextContainer
      );

      const editingProps = props.onClick
        ? {
            onClick: props.onClick,
            'data-scrivito-is-clickable': true,
          }
        : {};

      return React.createElement(props.tag, {
        ...customProps,
        ...renderProps,
        ...editingProps,
        ref: (e?: HTMLElement) => {
          element.current = e;
          if (props.elementCallback) props.elementCallback(e);
        },
      });
    }
  )
);

interface CustomInnerHtml {
  __html: string;
}

function isCustomInnerHtml(
  maybeCustomInnerHtml: unknown
): maybeCustomInnerHtml is CustomInnerHtml {
  return (
    isObject(maybeCustomInnerHtml) &&
    typeof (maybeCustomInnerHtml as CustomInnerHtml).__html === 'string'
  );
}

function renderPropsForField(
  field: BasicField<AttributeType>,
  customChildrenFromProps: React.ReactNode | undefined,
  customInnerHtml: { __html: string } | undefined,
  customOnClick: (<T>(e: React.MouseEvent<T>) => void) | undefined,
  widgetProps: WidgetProps | undefined,
  dataContextContainer: DataContextContainer | undefined
): React.DOMAttributes<HTMLElement> {
  const dataStack = dataContextContainer?.dataStack;

  const customChildren =
    customChildrenFromProps || customInnerHtml
      ? {
          children: customChildrenFromProps,
          dangerouslySetInnerHTML: customInnerHtml
            ? {
                __html: replaceInternalLinks(customInnerHtml.__html, {
                  dataStack,
                }),
              }
            : undefined,
        }
      : undefined;

  switch (field.type()) {
    case 'html':
      return renderPropsForHtml(
        field as BasicField<'html'>,
        customChildren,
        customOnClick,
        dataContextContainer
      );

    case 'string':
      return renderPropsForString(
        field as BasicField<'string'>,
        customChildren,
        dataContextContainer
      );

    case 'float':
    case 'integer':
      return (
        customChildren ??
        renderPropsForNumber(field as BasicField<'integer' | 'float'>)
      );

    case 'widget': {
      return {
        children: (
          <WidgetValue
            field={field as BasicField<'widget'>}
            widgetProps={widgetProps}
          />
        ),
      };
    }

    case 'widgetlist': {
      return {
        children: (
          <WidgetlistValue
            field={field as BasicField<'widgetlist'>}
            widgetProps={widgetProps}
          />
        ),
      };
    }

    default:
      return customChildren ?? {};
  }
}

function renderPropsForHtml(
  field: BasicField<'html'>,
  customChildren?: { children: React.ReactNode },
  customOnClick?: (e: React.MouseEvent) => unknown,
  dataContextContainer?: DataContextContainer
) {
  const diffContent = isComparisonActive()
    ? field.getHtmlDiffContent(getComparisonRange())
    : undefined;

  if (customChildren && !diffContent) {
    return {
      ...customChildren,
      onClick: customOnClick || handleClickOnHtml,
    };
  }

  const placeholders = dataContextContainer?.placeholders;
  const dataStack = dataContextContainer?.dataStack;

  return {
    dangerouslySetInnerHTML: {
      __html: replaceInternalLinks(
        diffContent ||
          replacePlaceholdersWithData(field.get(), {
            placeholders,
            dataStack,
            transform: escape,
          }),
        { dataStack }
      ),
    },
    onClick: handleClickOnHtml,
  };
}

function renderPropsForString(
  field: BasicField<'string'>,
  customChildren?: { children: React.ReactNode },
  dataContextContainer?: DataContextContainer
) {
  if (isComparisonActive()) {
    const diffContent = field.getHtmlDiffContent(getComparisonRange());

    if (diffContent) {
      return { dangerouslySetInnerHTML: { __html: diffContent } };
    }
  }

  const placeholders = dataContextContainer?.placeholders;
  const dataStack = dataContextContainer?.dataStack;

  return (
    customChildren ?? {
      children: replacePlaceholdersWithData(field.get(), {
        placeholders,
        dataStack,
      }),
    }
  );
}

function renderPropsForNumber(field: BasicField<'integer' | 'float'>) {
  const value = field.get();
  const parsedValue = value === 0 ? '0' : value;

  return { children: parsedValue };
}

function handleClickOnHtml(e: React.MouseEvent<HTMLElement>) {
  const linkTarget = findClickTarget(e);

  if (!linkTarget) return;

  if (isOpenInNewWindow(linkTarget)) {
    handleOpenInNewWindow(e, linkTarget);
  } else {
    handleOpenInCurrentWindow(e, linkTarget);
  }
}

function handleOpenInNewWindow<T>(
  e: React.MouseEvent<T>,
  { openInNewWindow: url }: OpenInNewWindow
) {
  if (uiAdapter) {
    e.preventDefault();

    openInNewWindow(url);
  }
}

function handleOpenInCurrentWindow<T>(
  e: React.MouseEvent<T>,
  { openInCurrentWindow: resource }: OpenInCurrentWindow
) {
  e.preventDefault();

  BrowserLocation.push(resource);
}
