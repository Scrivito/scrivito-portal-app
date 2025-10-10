import * as React from 'react';

import { basicUrlFor } from 'scrivito_sdk/app_support/basic_url_for';
import { openInNewWindow } from 'scrivito_sdk/app_support/change_location';
import { currentSiteId } from 'scrivito_sdk/app_support/current_page';
import { getDetailsPageUrl } from 'scrivito_sdk/app_support/get_details_page_url';
import { navigateTo } from 'scrivito_sdk/app_support/navigate_to';
import { uiAdapter } from 'scrivito_sdk/app_support/ui_adapter';
import {
  QueryParameters,
  isModifierClick,
  openWindow,
} from 'scrivito_sdk/common';
import {
  DataItem,
  getDataContextParameters,
  isSinglePlaceholder,
  replacePlaceholdersWithData,
} from 'scrivito_sdk/data_integration';
import { load } from 'scrivito_sdk/loadable';
import { BasicLink, BasicObj } from 'scrivito_sdk/models';
import {
  useDataStack,
  usePlaceholders,
} from 'scrivito_sdk/react/data_context_container';
import { connect } from 'scrivito_sdk/react_connect';
import { Link, Obj, unwrapAppClass } from 'scrivito_sdk/realm';

type LinkTagTo = Obj | Link | DataItem | string | null;

/** @public */
export const LinkTag = connect(function LinkTag(props: {
  [key: string]: unknown;
  to?: LinkTagTo;
  target?: string;
  rel?: string;
  params?: QueryParameters | false | null;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  children?: React.ReactNode;
  ref?: React.Ref<HTMLAnchorElement | null>;
}) {
  const dataStack = useDataStack();
  const placeholders = usePlaceholders();

  const {
    children,
    to: linkTagTo,
    params: linkTagParams,
    ...customProps
  } = props;

  return (
    <a
      {...customProps}
      href={getHref()}
      target={getTarget()}
      rel={getRel()}
      onClick={onClick}
      ref={props.ref}
    >
      {children}
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

  async function onClick(e: React.MouseEvent<HTMLAnchorElement>) {
    if (props.onClick) {
      props.onClick(e);

      if (e.defaultPrevented) return;
    }

    e.preventDefault();

    const destination = await load(getDestination);
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

  function navigateAppTo(to: LinkTagTo, params: QueryParameters | undefined) {
    navigateTo(to, params && { params });
  }

  function getDestination(): Destination | null {
    if (!props.to) return null;

    if (typeof props.to === 'string') {
      return {
        to: props.to,
        href: props.to,
      };
    }

    if (props.to instanceof DataItem) {
      const obj = props.to.obj();

      if (obj) {
        return getBasicLinkOrBasicObjDestination(unwrapAppClass(obj), obj);
      }

      return getDataItemDestination(props.to);
    }

    const objOrLink = unwrapAppClass(props.to);
    const singlePlaceholder = getSinglePlaceholder(objOrLink);

    if (singlePlaceholder) {
      return getSinglePlaceholderDestination(singlePlaceholder);
    }

    if (objOrLink instanceof BasicLink || objOrLink instanceof BasicObj) {
      return getBasicLinkOrBasicObjDestination(objOrLink, props.to);
    }

    return null;
  }

  function getDataItemDestination(dataItem: DataItem) {
    const url = getDetailsPageUrl(
      dataItem,
      dataItem.obj()?.siteId() || currentSiteId()
    );

    if (!url) return null;

    return {
      to: dataItem,
      href: url,
      queryParameters: undefined,
    };
  }

  function getBasicLinkOrBasicObjDestination(
    objOrLink: BasicObj | BasicLink,
    to: LinkTagTo
  ) {
    return {
      to,
      href: getDestinationHref(objOrLink),
      queryParameters: getDestinationQueryParameters(objOrLink),
    };
  }

  function getSinglePlaceholderDestination(placeholder: string) {
    const url = replacePlaceholdersWithData(placeholder, {
      placeholders,
      dataStack,
    });

    return {
      to: new Link({ url }),
      href: url,
      queryParameters: undefined,
    };
  }

  function getDestinationQueryParameters(basicObjOrLink: BasicObj | BasicLink) {
    let queryParameters = props.params || undefined;

    if (dataStack) {
      const dataContextParameters = getDataContextParameters(
        basicObjOrLink,
        dataStack
      );

      if (dataContextParameters) {
        queryParameters = {
          ...dataContextParameters,
          ...queryParameters,
        };
      }
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
  to: LinkTagTo;
  href: string;
  queryParameters?: QueryParameters | undefined;
}
