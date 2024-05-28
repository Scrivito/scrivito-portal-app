import {
  generateDestination,
  generateUrlWithCanonicalOrigin,
} from 'scrivito_sdk/app_support/routing';
import { ArgumentError, QueryParameters } from 'scrivito_sdk/common';
import { BasicLink, BasicObj, Binary } from 'scrivito_sdk/models';
import { isBinaryBasicObj } from 'scrivito_sdk/realm';

type Target = BasicObj | BasicLink | Binary;
type Options = Readonly<
  {
    hash?: string;
    withoutOriginIfLocal?: true;
  } & (
    | {
        query?: string;
        queryParameters?: undefined;
      }
    | {
        query?: undefined;
        queryParameters?: QueryParameters;
      }
  )
>;

export function basicUrlFor(target: Target, options: Options): string {
  if (target instanceof BasicLink) return urlForLink(target, options);

  if (target instanceof Binary) return target.url();

  return basicUrlForObj(target, options);
}

export function basicUrlForObj(
  obj: BasicObj,
  options: Options & { preserveObjId?: boolean }
): string {
  if (isBinaryBasicObj(obj)) {
    const binaryUrl = urlForBinaryObj(obj, options.preserveObjId);

    if (binaryUrl) return binaryUrl;
  }

  return urlForNonBinaryObj(obj, options);
}

function urlForBinaryObj(
  obj: BasicObj,
  withoutPlaceholder?: boolean
): string | undefined {
  const blob = obj.get('blob', ['binary']);

  if (blob) {
    return withoutPlaceholder ? blob.urlWithoutPlaceholder() : blob.url();
  }
}

function urlForLink(link: BasicLink, options: Options): string {
  if (link.isExternal()) return link.url();

  const obj = link.obj();
  if (obj instanceof BasicObj) {
    return basicUrlForObj(obj, populateMissingOptionsFromLink(options, link));
  }

  throw new ArgumentError('Missing link target.');
}

function urlForNonBinaryObj(
  obj: BasicObj,
  { query: queryString, queryParameters, withoutOriginIfLocal, hash }: Options
): string {
  const query = queryParameters ?? queryString;

  if (!withoutOriginIfLocal) {
    return generateUrlWithCanonicalOrigin({ obj, query, hash });
  }

  const destination = generateDestination({ obj, query, hash });

  switch (destination.type) {
    case 'local':
      return destination.resource;
    case 'crossSite':
      return destination.url;
    default:
      return destination.fallbackUrl;
  }
}

function populateMissingOptionsFromLink(options: Options, link: BasicLink) {
  const linkOptions = { ...options };
  if (!options.queryParameters && typeof options.query !== 'string') {
    linkOptions.query = link.query() || undefined;
  }

  if (typeof options.hash !== 'string') {
    linkOptions.hash = link.hash() || undefined;
  }

  return linkOptions;
}
