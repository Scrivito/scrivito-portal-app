import {
  SiteData,
  getCurrentRoute,
} from 'scrivito_sdk/app_support/current_page_data';
import {
  CrossSiteDestination,
  DestinationUnavailable,
  LocalDestination,
  generateDestinationUnavailable,
  recognizeDestinationUnavailable,
} from 'scrivito_sdk/app_support/destination_types';
import { withDisabledPermalinkCache } from 'scrivito_sdk/app_support/permalink_cache';
import { setHomepageCallback } from 'scrivito_sdk/app_support/routing/homepage_callback';
import {
  generateRoutingPath,
  recognizeRoutingPath,
} from 'scrivito_sdk/app_support/routing_path';
import {
  SiteMappingConfiguration,
  baseUrlForSite,
  initSiteMapping,
  recognizeSiteAndPath,
} from 'scrivito_sdk/app_support/site_mapping';
import {
  QueryParameters,
  ScrivitoError,
  buildQueryString,
  currentOrigin,
  urlResource,
} from 'scrivito_sdk/common';
import { BasicObj } from 'scrivito_sdk/models';

export type Hash = string | null;

export type Route = ObjRoute | NotResponsibleRoute | ObjNotFoundRoute;

interface CommonRouteProperties {
  query?: string;
}

interface NotResponsibleRoute extends CommonRouteProperties {
  objId?: undefined;
  sitePath: null;
  siteData?: SiteData;
}

interface DestinationUnavailableRecognized extends CommonRouteProperties {
  objId: string;
  sitePath: null;
  siteData?: undefined;
}

export interface ObjRoute extends CommonRouteProperties {
  objId: string;
  sitePath: string;
  siteData: SiteData;
}

interface ObjNotFoundRoute extends CommonRouteProperties {
  objId?: undefined;
  sitePath: string;
  siteData: SiteData;
}

interface GenerateUrlOptions {
  query?: QueryParameters | string;
  hash?: Hash;
}

export function isDestinationUnavailableRecognized(
  route: Route | DestinationUnavailableRecognized
): route is DestinationUnavailableRecognized {
  return !!route.objId && !route.siteData;
}

export function isNotResponsibleRoute(
  route: Route
): route is NotResponsibleRoute {
  return !route.sitePath;
}

export function isObjNotFoundRoute(route: Route): route is ObjNotFoundRoute {
  return !!route.sitePath && !route.objId;
}

interface GenerateObjUrlOptions extends GenerateUrlOptions {
  obj: BasicObj;

  objId?: undefined;
}

interface GenerateObjIdUrlOptions extends GenerateUrlOptions {
  objId: string;

  obj?: undefined;
}

export function generateUrl(
  options: GenerateObjUrlOptions | GenerateObjIdUrlOptions
): string {
  return destinationToUrl(
    options.obj
      ? generateDestination(options)
      : generateDestinationForId(options)
  );
}

/** get the local url-path for the given obj
 *
 * returns undefined, if the obj's site does not belong to the current origin
 */
export function generateLocalPath(obj: BasicObj): string | undefined {
  const destination = generateDestination({ obj });

  return destination.type === 'local' ? destination.resource : undefined;
}

function destinationToUrl(destination: RoutingDestination): string {
  switch (destination.type) {
    case 'local':
      return destination.resource;
    case 'crossSite':
      return destination.url;
    default:
      return destination.fallbackUrl;
  }
}

type RoutingDestination =
  | LocalDestination
  | CrossSiteDestination
  | DestinationUnavailable;

export function generateDestination(
  options: GenerateObjUrlOptions
): RoutingDestination {
  const obj = options.obj;
  const currentRoute = getCurrentRoute();
  const currentSiteData = currentRoute?.siteData;
  const currentSiteId = currentSiteData?.siteId;
  const siteId = obj.siteId() ?? currentSiteId;
  if (!siteId) return unavailableFor(options);

  if (siteId !== currentSiteId) {
    const url = canonicalUrlForSite(siteId, options);

    return url ? { type: 'crossSite', url } : unavailableFor(options);
  }

  const baseUrl = currentSiteData?.baseUrl;
  if (!baseUrl) return unavailableFor(options);

  const url = new URL(
    joinUri(baseUrl, generateRoutingPath(obj, siteId), options)
  );

  return currentRoute?.sitePath || url.origin === currentOrigin()
    ? { type: 'local', resource: urlResource(url) }
    : { type: 'crossSite', url: url.href };
}

/** generate an absolute URL for the given Obj, using the canonical origin
 *
 * the canonical origin is the origin that the baseUrlForSite callback defines.
 */
export function generateUrlWithCanonicalOrigin(
  options: GenerateObjUrlOptions
): string {
  const siteId = options.obj.siteId() ?? getCurrentRoute()?.siteData?.siteId;
  if (!siteId) return unavailableFor(options).fallbackUrl;

  return (
    canonicalUrlForSite(siteId, options) ?? unavailableFor(options).fallbackUrl
  );
}

function canonicalUrlForSite(siteId: string, options: GenerateObjUrlOptions) {
  const baseUrl = baseUrlForSite(siteId);

  return (
    baseUrl &&
    joinUri(baseUrl, generateRoutingPath(options.obj, siteId), options)
  );
}

function unavailableFor(options: GenerateObjUrlOptions) {
  return generateDestinationUnavailable({
    objId: options.obj.id(),
    query: options.query,
    hash: options.hash,
  });
}

export function generateDestinationForId(
  options: GenerateObjIdUrlOptions
): RoutingDestination {
  const { objId, query, hash } = options;
  const currentRoute = getCurrentRoute();
  if (!currentRoute?.siteData) {
    return generateDestinationUnavailable({ objId, query, hash });
  }

  const url = new URL(
    joinUri(currentRoute.siteData.baseUrl, `/${objId}`, { query, hash })
  );
  return currentRoute.sitePath || url.origin === currentOrigin()
    ? { type: 'local', resource: urlResource(url) }
    : { type: 'crossSite', url: url.href };
}

/** join url components into a URL
 *
 * baseUrl is expected to be normalized (= has no trailing slash)
 * path is expected to be normalized (= has leading slash)
 */
function joinUri(
  baseUrl: string,
  path: string,
  { query, hash }: GenerateUrlOptions
) {
  const urlString = path === '/' ? baseUrl : `${baseUrl}${path}`;

  if (!URL.canParse(urlString)) return urlString;

  const url = new URL(urlString);

  if (typeof query === 'string' && query !== '?') url.search = query;
  if (typeof query === 'object') url.search = buildQueryString(query);
  if (hash && hash !== '#') url.hash = hash;

  return url.href;
}

export function recognize(
  url: string
): Route | DestinationUnavailableRecognized {
  const destinationUnavailable = recognizeDestinationUnavailable(url);
  if (destinationUnavailable) {
    const { objId, query } = destinationUnavailable;

    return {
      objId,
      sitePath: null,
      query,
    };
  }

  const recognized = recognizeSiteAndPath(url);
  const query = new URL(url, 'http://example.com').search.replace(/^\?/, '');

  if (recognized.sitePath === null) {
    return {
      ...recognized,
      query,
    };
  }

  return {
    ...recognized,
    objId: recognizeRoutingPath(recognized),
    query,
  };
}

type RoutingConfiguration = {
  homepageCallback: () => BasicObj | null;
} & SiteMappingConfiguration;

export function initRouting({
  homepageCallback,
  ...siteMappingConfiguration
}: RoutingConfiguration): void {
  setHomepageCallback(homepageCallback);
  initSiteMapping(siteMappingConfiguration);
}

export function ensureRoutingDataAvailable(basicPage: BasicObj) {
  withDisabledPermalinkCache(() => {
    const url = generateUrlWithCanonicalOrigin({ obj: basicPage });
    const route = recognize(url);

    if (route.objId !== basicPage.id()) {
      throw new ScrivitoError(
        `baseUrlForSite produced ${url} for ${basicPage.id()}, ` +
          'but siteForUrl did not recognize that URL correctly.'
      );
    }
  });
}

export function isOriginLocal(url: string): boolean {
  return !URL.canParse(url) || new URL(url).origin === currentOrigin();
}

export function isSiteLocal(url: string): boolean {
  const currentBaseUrl = getCurrentRoute()?.siteData?.baseUrl;
  return !!currentBaseUrl && url.indexOf(currentBaseUrl) === 0;
}
