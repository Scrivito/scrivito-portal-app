// @rewire
import isEmpty from 'lodash-es/isEmpty';
import * as URI from 'urijs';

import {
  RoutingTarget,
  basicNavigateTo,
  getNextNavigateToCallId,
  isLatestNavigateToCallId,
} from 'scrivito_sdk/app_support/basic_navigate_to';
import { currentSiteId } from 'scrivito_sdk/app_support/current_page';
import { getDetailsPageAndQuery } from 'scrivito_sdk/app_support/get_details_page_url';
import { Hash } from 'scrivito_sdk/app_support/routing';
import {
  ArgumentError,
  QueryParameters,
  throwNextTick,
} from 'scrivito_sdk/common';
import { DataItem } from 'scrivito_sdk/data_integration';
import { load } from 'scrivito_sdk/loadable';
import { BasicLink, BasicObj } from 'scrivito_sdk/models';
import { Link, Obj, unwrapAppClass } from 'scrivito_sdk/realm';
import { failIfFrozen } from 'scrivito_sdk/state';

type Target = Obj | Link | DataItem | string | null;

type TargetFunction = () => Target;

interface OptionsWithoutConvenienceParams {
  hash?: Hash;
  params?: QueryParameters;
}

type Options =
  | OptionsWithoutConvenienceParams
  | (QueryParameters & OptionsWithoutConvenienceParams);

/** @public */
export function navigateTo(
  target: Target | TargetFunction,
  options?: Options
): void;

/** @internal */
export function navigateTo(
  target: Target | TargetFunction | DataItem,
  options?: Options
): void {
  navigateToAsync(target, options);
}

// Extracted and exported for test purpose only
export async function navigateToAsync(
  target: Target | TargetFunction | DataItem,
  options?: Options
) {
  const callId = getNextNavigateToCallId();

  failIfFrozen('navigateTo');

  if (target === null) return;

  const navigateToOptions = getNavigateToOptions(options);

  if (target instanceof DataItem) {
    await navigateToDataItem(target, navigateToOptions, callId);
  } else {
    navigateToTarget(target, callId, navigateToOptions);
  }
}

async function navigateToTarget(
  target: Target | TargetFunction | DataItem,
  callId: number,
  options: { queryParameters?: QueryParameters; hash: Hash }
) {
  try {
    const evaluatedTarget = await load(() =>
      typeof target === 'function' ? target() : target
    );

    const basicTarget = unwrapAppClass(evaluatedTarget);

    if (typeof basicTarget === 'string') {
      assertAbsoluteUrl(basicTarget);
      return basicNavigateTo({ url: basicTarget }, callId);
    }

    if (!isBasicTarget(basicTarget)) return;

    return basicNavigateTo(
      await loadRoutingTarget(basicTarget, options),
      callId
    );
  } catch (e) {
    if (isLatestNavigateToCallId(callId)) throwNextTick(e);
  }
}

async function navigateToDataItem(
  dataItem: DataItem,
  {
    queryParameters: optionalParameters,
    hash,
  }: { queryParameters?: QueryParameters; hash: Hash },
  callId: number
) {
  const pageAndQuery = await load(() =>
    getDetailsPageAndQuery(dataItem, currentSiteId())
  );

  if (pageAndQuery) {
    const { detailsPage, queryParameters: requiredParameters } = pageAndQuery;

    if (optionalParameters) {
      assertNoParametersConflict(requiredParameters, optionalParameters);
    }

    return basicNavigateTo(
      {
        objId: detailsPage.id(),
        query: { ...requiredParameters, ...optionalParameters },
        hash,
      },
      callId
    );
  }
}

function assertNoParametersConflict(
  requiredParameters: QueryParameters,
  optionalParameters: QueryParameters
) {
  Object.entries(optionalParameters).forEach(([key, value]) => {
    if (requiredParameters[key] === value) {
      throw new ArgumentError(
        `Query parameter "${key}" is reserved for internal usage`
      );
    }
  });
}

async function loadRoutingTarget(
  basicTarget: BasicObj | BasicLink,
  options: { queryParameters?: QueryParameters; hash: Hash }
) {
  const routingTarget = await load(() =>
    getRoutingTarget(basicTarget, options.queryParameters, options.hash)
  );

  if (!routingTarget) {
    throw new ArgumentError(
      'The link provided to navigateTo has no destination.'
    );
  }

  return routingTarget;
}

function isBasicTarget(target: unknown): target is BasicObj | BasicLink {
  return target instanceof BasicObj || target instanceof BasicLink;
}

function getNavigateToOptions(options: Options | undefined) {
  if (!options) return { hash: null, queryParameters: undefined };

  const { hash, params, ...convenienceParams } = options;

  return {
    hash: hash || null,
    queryParameters: { ...convenienceParams, ...params },
  };
}

function getRoutingTarget(
  target: BasicObj | BasicLink,
  query: QueryParameters | undefined,
  hash: Hash
): RoutingTarget | undefined {
  if (target instanceof BasicLink) {
    return getRoutingTargetFromLink(target, query, hash);
  }

  return { objId: target.id(), query, hash };
}

function getRoutingTargetFromLink(
  link: BasicLink,
  query: QueryParameters | undefined,
  hash: Hash
): RoutingTarget | undefined {
  if (link.isExternal()) return { url: link.url() };

  const obj = link.obj();
  const objId = obj instanceof BasicObj ? obj.id() : link.objId();
  if (!objId) return;

  return {
    objId,
    query: !isEmpty(query) ? query : link.queryParameters(),
    hash: hash || link.hash(),
  };
}

function assertAbsoluteUrl(url: string) {
  if (URI(url).is('relative')) {
    throw new ArgumentError(
      `Scrivito.navigateTo was called with a relative URL "${url}".` +
        ' When called with a string, Scrivito.navigateTo only accepts absolute URLs.'
    );
  }
}
