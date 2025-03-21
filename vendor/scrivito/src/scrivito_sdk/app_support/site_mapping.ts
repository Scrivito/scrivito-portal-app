import * as URI from 'urijs';

import { withForbiddenSiteContext } from 'scrivito_sdk/app_support/current_page';
import { SiteData } from 'scrivito_sdk/app_support/current_page_data';
import {
  ArgumentError,
  ScrivitoError,
  currentOrigin,
  docUrl,
  onReset,
  prettyPrint,
  throwNextTick,
} from 'scrivito_sdk/common';

export type SiteMappingConfiguration = ClassicConfig | MultisiteConfig;

interface ClassicConfig {
  origin?: string;
  routingBasePath?: string;

  baseUrlForSite?: undefined;
  siteForUrl?: undefined;
}

interface MultisiteConfig {
  baseUrlForSite: BaseUrlForSiteCallback;
  siteForUrl: SiteForUrlCallback;
}

export type BaseUrlForSiteCallback = (siteId: string) => string | undefined;

// since this callback is from userland, we must assume unknown as the return type
let baseUrlForSiteCallback: ((siteId: string) => unknown) | undefined;

export type SiteForUrlCallback = (url: string) => SiteForUrlResult;
export type SiteForUrlResult = { siteId: string; baseUrl: string } | undefined;

// since this callback is from userland, we must assume unknown as the return type
let siteForUrlCallback: ((url: string) => unknown) | undefined;

export function initSiteMapping(config: SiteMappingConfiguration = {}): void {
  if (config.baseUrlForSite) {
    baseUrlForSiteCallback = config.baseUrlForSite;
    siteForUrlCallback = config.siteForUrl;
    return;
  }

  // "desugar" the ClassicConfig
  const basePath = config.routingBasePath ?? '';
  let baseUrl: string | undefined;

  baseUrlForSiteCallback = (siteId) => {
    if (siteId === null || siteId === 'default') {
      if (!baseUrl) {
        const origin = config.origin ?? currentOrigin() ?? throwNoOrigin();
        baseUrl = `${origin}/${basePath.replace(/^\/+/, '')}`;
      }

      return baseUrl;
    }
  };

  siteForUrlCallback = (url) => {
    const uri = new URI(url);

    const origin = uri.origin();
    if (origin !== config.origin && origin !== currentOrigin()) return;

    if (!basePath) {
      return { siteId: 'default', baseUrl: uri.origin() };
    }

    return {
      siteId: 'default',
      baseUrl: new URI(uri.origin()).resource(basePath).toString(),
    };
  };
}

export function baseUrlForSite(siteId: string): string | null {
  const result = executeBaseUrlForSiteCallback(siteId);

  if (result === undefined) return null;
  if (result === '') return null;
  if (typeof result === 'string') return removeTrailingSlashes(result);

  reportUnexpectedReturnValue('baseUrlForSite', result, 'String | Void');
  return null;
}

export interface SiteDataAndPath {
  siteData: SiteData;
  sitePath: string;
}

export function recognizeSiteAndPath(
  uriToRecognize: URI
): SiteDataAndPath | { siteData?: SiteData; sitePath: null } {
  if (!siteForUrlCallback) throwNotInitialized();

  const uri = normalizeUri(uriToRecognize);
  const url = uri.toString();
  const result = siteForUrl(url);
  if (!result) return { sitePath: null };

  return {
    siteData: { siteId: result.siteId, baseUrl: result.baseUrl },
    sitePath: determineSitePath(result.baseUrl, url),
  };
}

function determineSitePath(baseUrl: string, url: string) {
  if (!startsWith(baseUrl, url)) return null;

  const restOfUrl = url.substring(baseUrl.length);
  const path = removeNonPathComponents(restOfUrl);

  if (path === '') return '/';
  if (path.charAt(0) !== '/') return null;

  return path;
}

function startsWith(prefix: string, input: string) {
  return input.substring(0, prefix.length) === prefix;
}

function removeNonPathComponents(resource: string) {
  return new URI('').resource(resource).path();
}

function normalizeUri(uri: URI) {
  const normalizedUrl = uri.clone();

  if (normalizedUrl.is('relative')) {
    normalizedUrl.origin(currentOrigin() ?? throwNoOrigin());
  }

  normalizedUrl.normalizePath();

  return normalizedUrl;
}

function siteForUrl(url: string): SiteForUrlResult {
  const result = withForbiddenSiteContext(
    'Access to current site inside siteForUrl. Forgot to use onAllSites?',
    () => siteForUrlCallback?.call(null, removeQueryAndHash(url))
  );

  if (!isSiteForUrlResult(result)) {
    reportUnexpectedReturnValue(
      'siteForUrl',
      result,
      '{siteId: String, baseUrl: String} | Void'
    );

    return undefined;
  }

  return (
    result && {
      siteId: result.siteId,
      baseUrl: removeTrailingSlashes(result.baseUrl),
    }
  );
}

function removeQueryAndHash(url: string) {
  return new URI(url).query('').hash('').href();
}

function removeTrailingSlashes(input: string) {
  return input.replace(/([^/]|^)\/+$/, '$1');
}

function reportUnexpectedReturnValue(
  callbackName: string,
  actual: unknown,
  expectedType: string
) {
  const errorMessage = `Unexpected return value from ${callbackName}: got ${prettyPrint(
    actual
  )}, expected type ${expectedType}. ${SEE_CONFIGURE}`;
  throwNextTick(new ArgumentError(errorMessage));
}

function executeBaseUrlForSiteCallback(siteId: string) {
  if (!baseUrlForSiteCallback) throwNotInitialized();
  return baseUrlForSiteCallback.call(null, siteId);
}

// For test purpose only.
export function reset() {
  baseUrlForSiteCallback = undefined;
  siteForUrlCallback = undefined;
}

function throwNotInitialized(): never {
  throw new ScrivitoError(
    'Cannot use routing before Scrivito.configure was called.'
  );
}

function throwNoOrigin(): never {
  throw new ScrivitoError(
    `Cannot compute an absolute URL without a configured origin or base URL. ${SEE_CONFIGURE}`
  );
}

function isSiteForUrlResult(
  maybeSiteForUrlResult: unknown
): maybeSiteForUrlResult is SiteForUrlResult {
  const siteForUrlResult = maybeSiteForUrlResult as SiteForUrlResult;
  if (siteForUrlResult === undefined) return true;
  return (
    typeof siteForUrlResult?.siteId === 'string' &&
    typeof siteForUrlResult?.baseUrl === 'string'
  );
}

const SEE_CONFIGURE = `Visit ${docUrl(
  'js-sdk/configure'
)} for more information.`;

onReset(reset);
