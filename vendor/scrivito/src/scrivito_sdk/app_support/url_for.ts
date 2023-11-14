import { basicUrlFor } from 'scrivito_sdk/app_support/basic_url_for';
import { checkArgumentsFor, tcomb as t } from 'scrivito_sdk/common';
import { assertNotUsingInMemoryTenant } from 'scrivito_sdk/data';
import { Binary, BinaryType, LinkType, ObjType } from 'scrivito_sdk/models';
import { Link, Obj, unwrapAppClass } from 'scrivito_sdk/realm';

export interface UrlForOptions {
  readonly query?: string;
  readonly hash?: string;
  readonly fragment?: string; // deprecated
}

/** @public */
export function urlFor(
  target: Binary | Link | Obj,
  options?: UrlForOptions
): string;

/** @internal */
export function urlFor(
  target: Binary | Link | Obj,
  options?: UrlForOptions,
  ...excessArgs: never[]
): string {
  assertNotUsingInMemoryTenant('Scrivito.urlFor');
  checkUrlFor(target, options, ...excessArgs);

  let query: string | undefined;
  let hash: string | undefined;
  if (options) {
    query = options.query;
    hash = options.hasOwnProperty('hash') ? options.hash : options.fragment;
  }

  return basicUrlFor(unwrapAppClass(target), { query, hash });
}

const TargetType = t.union([ObjType, LinkType, BinaryType]);

const OptionsType = t.interface({
  query: t.maybe(t.String),
  hash: t.maybe(t.String),
  fragment: t.maybe(t.String), // deprecated
});

const checkUrlFor = checkArgumentsFor(
  'urlFor',
  [
    ['target', TargetType],
    ['options', t.maybe(OptionsType)],
  ],
  {
    docPermalink: 'js-sdk/urlFor',
  }
);
