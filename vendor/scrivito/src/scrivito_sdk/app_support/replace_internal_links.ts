import { basicUrlForObj } from 'scrivito_sdk/app_support/basic_url_for';
import { currentAppSpace } from 'scrivito_sdk/app_support/current_app_space';
import { generateUrl } from 'scrivito_sdk/app_support/routing';
import { checkArgumentsFor, tcomb as t } from 'scrivito_sdk/common';
import { DataStack, getDataContextQuery } from 'scrivito_sdk/data_integration';
import { InternalUrl, formatInternalLinks } from 'scrivito_sdk/link_resolution';
import { getObjFrom } from 'scrivito_sdk/models';

/** @public */
export function resolveHtmlUrls(htmlString: string): string {
  checkResolveHtmlUrls(htmlString);

  return replaceInternalLinks(htmlString);
}

interface Options {
  preserveObjId?: true;
  dataStack?: DataStack;
}

export function replaceInternalLinks(
  htmlString: string,
  options?: Options
): string {
  return formatInternalLinks(htmlString, (url) =>
    calculateInternalLinkUrl(url, options)
  );
}

function calculateInternalLinkUrl(
  { obj_id: objId, query, hash }: InternalUrl,
  options?: Options
) {
  const obj = getObjFrom(currentAppSpace(), objId);
  if (!obj) return generateUrl({ objId, query, hash });

  const dataStack = options?.dataStack;

  return basicUrlForObj(obj, {
    query: dataStack ? getDataContextQuery(obj, dataStack, query) : query,
    hash,
    ...options,
    withoutOriginIfLocal: true,
  });
}

const checkResolveHtmlUrls = checkArgumentsFor(
  'resolveHtmlUrls',
  [['htmlString', t.String]],
  { docPermalink: 'js-sdk/resolveHtmlUrls' }
);
