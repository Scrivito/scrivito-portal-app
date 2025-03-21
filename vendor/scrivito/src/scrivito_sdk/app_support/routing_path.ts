import { currentAppSpace } from 'scrivito_sdk/app_support/current_app_space';
import * as PermalinkCache from 'scrivito_sdk/app_support/permalink_cache';
import { homepageFromCallback } from 'scrivito_sdk/app_support/routing/homepage_callback';
import { SiteDataAndPath } from 'scrivito_sdk/app_support/site_mapping';
import {
  isGlobalOrFromUnstableSelectedSite,
  recognizeUnstableMultiSitePermalink,
  useUnstableMultiSiteMode,
} from 'scrivito_sdk/app_support/unstable_multi_site_mode';
import { loadableWithDefault } from 'scrivito_sdk/loadable';
import {
  BasicObj,
  getObjBy,
  getObjFrom,
  getRootObjFrom,
  restrictToSite,
  restrictToSiteAndGlobal,
} from 'scrivito_sdk/models';
import { wrapInAppClass } from 'scrivito_sdk/realm';

export function generateRoutingPath(obj: BasicObj, siteId: string): string {
  if (isHomepage(obj, siteId)) return '/';

  const permalink = generatePermalinkPath(obj, siteId);
  if (permalink) return permalink;

  const slug = generateSlug(obj);
  if (slug) {
    return `/${slug}-${obj.id()}`;
  }

  return `/${obj.id()}`;
}

export function recognizeRoutingPath({
  sitePath: pathToRecognize,
  siteData: { siteId },
}: SiteDataAndPath): string | undefined {
  const path = pathToRecognize.replace(/^\/+([^/]|$)|([^/]|^)\/+$/g, '$1$2');

  if (path === '') {
    return usesOldStyleRouting(siteId)
      ? homepageFromCallback()?.id()
      : getRootObjFrom(currentAppSpace().and(restrictToSite(siteId)))?.id();
  }

  return extractObjIdFromPath(path) ?? recognizePermalink(path, siteId)?.id();
}

function generatePermalinkPath(obj: BasicObj, siteId: string) {
  if (obj.isDeleted()) return;

  const permalink = obj.permalink();
  if (!permalink) return;

  if (
    usesUnstableMultiSiteModeForSite(siteId) &&
    !isGlobalOrFromUnstableSelectedSite(obj)
  ) {
    return;
  }

  PermalinkCache.cacheObjForPermalink(obj, permalink, siteId);

  return `/${permalink}`;
}

function recognizePermalink(
  path: string,
  siteId: string
): BasicObj | undefined {
  const scope = currentAppSpace().and(restrictToSiteAndGlobal(siteId));

  const objId = PermalinkCache.objIdForPermalink(path, siteId);
  if (objId) return getObjFrom(scope, objId) ?? undefined;

  if (usesUnstableMultiSiteModeForSite(siteId)) {
    return recognizeUnstableMultiSitePermalink(path, scope);
  }

  return getObjBy(scope, '_permalink', path) ?? undefined;
}

function isHomepage(obj: BasicObj, siteId: string) {
  if (!usesOldStyleRouting(siteId)) return obj.path() === '/';

  const homepage = loadableWithDefault(null, homepageFromCallback);
  return homepage && homepage.id() === obj.id();
}

function generateSlug(basicObj: BasicObj): string | undefined {
  const obj = wrapInAppClass(basicObj);

  // App functions can't be blindly trusted, since they can be deleted or monkey-patched
  if (!obj.slug) return;
  if (typeof obj.slug !== 'function') return;

  const slug = obj.slug();
  if (typeof slug === 'string') return slug;
}

function extractObjIdFromPath(input: string): string | null {
  if (input.length < 16) {
    return null;
  }
  if (input.length > 16 && input.slice(-17, -16) !== '-') {
    return null;
  }
  const id = input.slice(-16);
  if (id.match(/[^0-9a-f]/)) {
    return null;
  }
  return id;
}

function usesOldStyleRouting(siteId: string) {
  return siteId === 'default';
}

function usesUnstableMultiSiteModeForSite(siteId: string) {
  return usesOldStyleRouting(siteId) && useUnstableMultiSiteMode();
}
