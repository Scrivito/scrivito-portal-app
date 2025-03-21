import { basicUrlFor } from 'scrivito_sdk/app_support/basic_url_for';
import { throwInvalidArgumentsError } from 'scrivito_sdk/common';
import { assertNotUsingInMemoryTenant } from 'scrivito_sdk/data';
import {
  Binary,
  isWrappingBasicLink,
  isWrappingBasicObj,
} from 'scrivito_sdk/models';
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
): string {
  assertNotUsingInMemoryTenant('Scrivito.urlFor');
  checkUrlFor(target);

  let query: string | undefined;
  let hash: string | undefined;
  if (options) {
    query = options.query;
    hash = options.hasOwnProperty('hash') ? options.hash : options.fragment;
  }

  return basicUrlFor(unwrapAppClass(target), { query, hash });
}

function checkUrlFor(target: Binary | Link | Obj) {
  if (
    !(
      isWrappingBasicObj(target) ||
      isWrappingBasicLink(target) ||
      target instanceof Binary
    )
  ) {
    throwInvalidArgumentsError(
      'urlFor',
      "'target' must be an instance of 'Obj', 'Link' or 'Binary'.",
      {
        docPermalink: 'js-sdk/urlFor',
      }
    );
  }
}
