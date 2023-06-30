import * as React from 'react';

import { basicUrlFor } from 'scrivito_sdk/app_support/basic_url_for';
import { openInNewWindow } from 'scrivito_sdk/app_support/change_location';
import { isModifierClick } from 'scrivito_sdk/app_support/is_modifier_click';
import { navigateTo } from 'scrivito_sdk/app_support/navigate_to';
import { uiAdapter } from 'scrivito_sdk/app_support/ui_adapter';
import {
  QueryParameters,
  checkArgumentsFor,
  openWindow,
  tcomb as t,
} from 'scrivito_sdk/common';
import { getDataContextParameters } from 'scrivito_sdk/data_integration';
import {
  isSinglePlaceholder,
  replacePlaceholdersWithData,
} from 'scrivito_sdk/data_integration';
import { BasicLink, BasicObj, LinkType, ObjType } from 'scrivito_sdk/models';
import { connect } from 'scrivito_sdk/react/connect';
import {
  useDataContext,
  useDataStack,
} from 'scrivito_sdk/react/data_context_container';
import { Link, Obj, unwrapAppClass } from 'scrivito_sdk/realm';

/** @public */
export const LinkTag = connect(function LinkTag(props: {
  [key: string]: unknown;
  to?: Obj | Link | null;
  target?: string;
  rel?: string;
  params?: QueryParameters | false | null;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  children?: React.ReactNode;
}) {
  const dataStack = useDataStack();
  const dataContext = useDataContext();

  checkLinkTagProps(props);

  const customProps = { ...props };
  delete customProps.children;
  delete customProps.to;
  delete customProps.params;

  return (
    <a
      {...customProps}
      href={getHref()}
      target={getTarget()}
      rel={getRel()}
      onClick={onClick}
    >
      {props.children}
    </a>
  );

  function getHref(): string {
    return getDestination()?.href || '#';
  }

  function getTarget(): string | undefined {
    if (props.target) return props.target;

    if (props.to instanceof Link) {
      return unwrapAppClass(props.to).target() || undefined;
    }
  }

  function getRel(): string | undefined {
    if ('rel' in props) return props.rel;

    if (props.to instanceof Link) {
      return unwrapAppClass(props.to).rel() || undefined;
    }
  }

  function onClick(e: React.MouseEvent<HTMLAnchorElement>) {
    if (props.onClick) {
      props.onClick(e);

      if (e.defaultPrevented) return;
    }

    e.preventDefault();

    const destination = getDestination();
    if (!destination) return;

    const target = getTarget();
    const { to, href, queryParameters } = destination;

    if (target === '_blank' || isModifierClick(e)) {
      return openInNewWindow(href);
    }

    if (target === '_top' && uiAdapter) {
      return navigateAppTo(to, queryParameters);
    }

    if (target) {
      return openWindow(href, target);
    }

    navigateAppTo(to, queryParameters);
  }

  function navigateAppTo(
    to: Obj | Link | null,
    params: QueryParameters | undefined
  ) {
    navigateTo(to, params && { params });
  }

  function getDestination(): Destination | null {
    if (!props.to) return null;

    const basicObjOrLink = unwrapAppClass(props.to);
    const singlePlaceholder = getSinglePlaceholder(basicObjOrLink);

    if (singlePlaceholder) {
      const url = replacePlaceholdersWithData(singlePlaceholder, {
        dataContext,
        dataStack,
      });

      return {
        to: new Link({ url }),
        href: url,
        queryParameters: undefined,
      };
    }

    if (
      basicObjOrLink instanceof BasicLink ||
      basicObjOrLink instanceof BasicObj
    ) {
      return {
        to: props.to,
        href: getDestinationHref(basicObjOrLink),
        queryParameters: getDestinationQueryParameters(basicObjOrLink),
      };
    }

    return null;
  }

  function getDestinationQueryParameters(basicObjOrLink: BasicObj | BasicLink) {
    let queryParameters = props.params || undefined;

    if (dataStack) {
      queryParameters = {
        ...getDataContextParameters(basicObjOrLink, dataStack),
        ...queryParameters,
      };
    }

    return queryParameters;
  }

  function getDestinationHref(basicObjOrLink: BasicObj | BasicLink) {
    return basicUrlFor(basicObjOrLink, {
      queryParameters: getDestinationQueryParameters(basicObjOrLink),
      withoutOriginIfLocal: true,
    });
  }

  function getSinglePlaceholder(basicObjOrLink: BasicObj | BasicLink) {
    if (basicObjOrLink instanceof BasicLink && basicObjOrLink.isExternal()) {
      const maybeSinglePlaceholder = basicObjOrLink.url();

      if (isSinglePlaceholder(maybeSinglePlaceholder)) {
        return maybeSinglePlaceholder;
      }
    }
  }
});

interface Destination {
  to: Obj | Link | null;
  href: string;
  queryParameters: QueryParameters | undefined;
}

const checkLinkTagProps = checkArgumentsFor(
  'Scrivito.LinkTag',
  [
    [
      'props',
      t.interface(
        {
          to: t.maybe(t.union([ObjType, LinkType])),
          params: t.union([
            t.dict(t.String, t.union([t.Nil, t.String, t.list(t.String)])),
            t.maybe(t.irreducible('false', (v) => v === false)),
          ]),
          onClick: t.maybe(t.Function),
        },
        { strict: false }
      ),
    ],
  ],
  { docPermalink: 'js-sdk/LinkTag', severity: 'warning' }
);
