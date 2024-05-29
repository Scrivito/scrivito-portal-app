// @rewire
import isEmpty from 'lodash-es/isEmpty';
import * as URI from 'urijs';

import {
  RoutingTarget,
  basicNavigateTo,
  getNextNavigateToCallId,
  isLatestNavigateToCallId,
} from 'scrivito_sdk/app_support/basic_navigate_to';
import { Hash } from 'scrivito_sdk/app_support/routing';
import { urlForDataItem } from 'scrivito_sdk/app_support/url_for_data_item';
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

type Target = Obj | Link | DataItem | null;

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
    if (!isBasicTarget(basicTarget)) return;

    return basicNavigateTo(
      await getRoutingTarget(basicTarget, options),
      callId
    );
  } catch (e) {
    if (isLatestNavigateToCallId(callId)) throwNextTick(e);
  }
}

async function navigateToDataItem(
  dataItem: DataItem,
  options: { queryParameters?: QueryParameters; hash: Hash },
  callId: number
) {
  const url = await load(() => urlForDataItem(dataItem));
  if (!url) return;

  const uri = URI(url);

  const { queryParameters } = options;

  if (queryParameters) {
    const params = new URLSearchParams(uri.query());

    Object.entries(queryParameters).forEach(([key, value]) => {
      if (params.get(key) === value) {
        throw new ArgumentError(
          'The data ID is the same as the URL query param'
        );
      }
    });

    uri.addQuery(queryParameters);
  }

  if (options.hash) uri.hash(options.hash);
  return basicNavigateTo({ url: uri.resource() }, callId);
}

async function getRoutingTarget(
  basicTarget: BasicObj | BasicLink,
  options: { queryParameters?: QueryParameters; hash: Hash }
) {
  const routingTarget = await load(() =>
    extractRoutingTarget(basicTarget, options.queryParameters, options.hash)
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

function extractRoutingTarget(
  target: BasicObj | BasicLink,
  query: QueryParameters | undefined,
  hash: Hash
): RoutingTarget | undefined {
  if (target instanceof BasicLink) {
    return extractRoutingTargetForLink(target, query, hash);
  }

  return { objId: target.id(), query, hash };
}

function extractRoutingTargetForLink(
  link: BasicLink,
  queryParameters: QueryParameters | undefined,
  hashToApply: Hash
): RoutingTarget | undefined {
  if (link.isExternal()) return { url: link.url() };

  const hash = hashToApply || link.hash();
  const query =
    queryParameters && !isEmpty(queryParameters)
      ? queryParameters
      : link.queryParameters();

  const linkObj = link.obj();
  const objId = linkObj instanceof BasicObj ? linkObj.id() : link.objId();
  return objId ? { objId, query, hash } : undefined;
}
