// @rewire
import isEmpty from 'lodash-es/isEmpty';

import {
  RoutingTarget,
  basicNavigateTo,
  getNextNavigateToCallId,
  isLatestNavigateToCallId,
} from 'scrivito_sdk/app_support/basic_navigate_to';
import { Hash } from 'scrivito_sdk/app_support/routing';
import {
  ArgumentError,
  QueryParameters,
  checkArgumentsFor,
  nextTick,
  tcomb as t,
  throwNextTick,
} from 'scrivito_sdk/common';
import { load } from 'scrivito_sdk/loadable';
import { BasicLink, BasicObj, LinkType, ObjType } from 'scrivito_sdk/models';
import { Link, Obj, unwrapAppClass } from 'scrivito_sdk/realm';
import { failIfFrozen } from 'scrivito_sdk/state';

type Target = Obj | Link | null;

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
  target: Target | TargetFunction,
  options?: Options,
  ...excessArgs: never[]
): void {
  const callId = getNextNavigateToCallId();

  failIfFrozen('navigateTo');

  if (target === null) {
    nextTick(() => checkNavigateTo(target, options, ...excessArgs));
    return;
  }

  checkNavigateTo(target, options, ...excessArgs);

  let queryParameters: QueryParameters | undefined;
  let hash: Hash = null;

  if (options) {
    const {
      hash: optionsHash,
      params: optionsParams,
      ...convenienceParams
    } = options;

    checkNavigateToConvenience(target, convenienceParams);

    queryParameters = { ...convenienceParams, ...optionsParams };

    hash = optionsHash || null;
  }

  const providesTarget = () =>
    typeof target === 'function' ? target() : target;
  load(providesTarget)
    .then((evaluatedTarget: unknown) => {
      checkEvaluatedTarget(evaluatedTarget);

      const basicTarget = unwrapAppClass(evaluatedTarget);
      if (
        !(basicTarget instanceof BasicObj) &&
        !(basicTarget instanceof BasicLink)
      ) {
        return;
      }

      return load(() =>
        extractRoutingTarget(basicTarget, queryParameters, hash)
      ).then((routingTarget) => {
        if (!routingTarget) {
          throw new ArgumentError(
            'The link provided to navigateTo has no destination.'
          );
        }

        return basicNavigateTo(routingTarget, callId);
      });
    })
    .catch((e: Error) => {
      if (isLatestNavigateToCallId(callId)) throwNextTick(e);
    });
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

const EvaluatedTargetType = t.union([ObjType, LinkType]);

const TargetType = t.union([t.Function, EvaluatedTargetType]);

const ParamsValueType = t.dict(
  t.String,
  t.maybe(t.union([t.String, t.list(t.String), t.Nil]))
);

const checkNavigateTo = checkArgumentsFor(
  'navigateTo',
  [
    ['target', TargetType],
    [
      'options',
      t.maybe(
        t.interface(
          {
            hash: t.maybe(t.String),
            params: t.maybe(ParamsValueType),
          },
          { strict: false }
        )
      ),
    ],
  ],
  {
    docPermalink: 'js-sdk/navigateTo',
  }
);

const checkNavigateToConvenience = checkArgumentsFor(
  'navigateTo',
  [
    ['target', TargetType],
    ['options', t.maybe(ParamsValueType)],
  ],
  {
    docPermalink: 'js-sdk/navigateTo',
  }
);

const checkEvaluatedTarget = checkArgumentsFor(
  'navigateTo',
  [['target', EvaluatedTargetType]],
  {
    docPermalink: 'js-sdk/navigateTo',
  }
);
