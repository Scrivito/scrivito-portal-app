import {
  InternalError,
  ScrivitoError,
  never,
  onReset,
} from 'scrivito_sdk/common';
import { LoadableCollection, loadableWithDefault } from 'scrivito_sdk/loadable';
import { BasicObj, ObjScope, getAllObjsByValueFrom } from 'scrivito_sdk/models';
import { Obj, wrapInAppClass } from 'scrivito_sdk/realm';

export type SiteIdForObjCallback = (obj: Obj) => unknown;

export class UnstableMultiSiteModeOperationError extends ScrivitoError {
  constructor(message: string) {
    super(message);
  }
}

let getUnstableSiteIdForObjCallback: SiteIdForObjCallback | undefined;

export function setUnstableMultiSiteMode(callback: SiteIdForObjCallback): void {
  getUnstableSiteIdForObjCallback = callback;
}

export function useUnstableMultiSiteMode(): boolean {
  return !!getUnstableSiteIdForObjCallback;
}

export function getUnstableSiteIdForObjId(objId: string) {
  if (useUnstableMultiSiteMode()) {
    const obj = BasicObj.get(objId);
    if (obj) return getSiteIdForObj(obj);
  }

  return null;
}

function getSiteIdForObj(obj: BasicObj): string | null {
  const siteId = getUnstableSiteIdForObjCallback!(wrapInAppClass(obj));

  if (typeof siteId === 'string' && siteId.length > 0) {
    return siteId;
  }

  return null;
}

/** Selecting a site ID only makes sense in the unstable multi-site mode */
export function unstable_selectSiteId(siteId: string): void {
  if (!getUnstableSiteIdForObjCallback) {
    throw new UnstableMultiSiteModeOperationError(
      'Scrivito.unstable_selectSiteId is only available in the multi-site mode'
    );
  }

  const preselected = loadableWithDefault(null, getUnstableSelectedSiteId);
  if (preselected && preselected !== siteId) {
    throw new UnstableMultiSiteModeOperationError(
      `Scrivito.unstable_selectSiteId called with ${siteId}, but ${preselected} was already selected`
    );
  }

  if (typeof siteId !== 'string' || !siteId) {
    throw new UnstableMultiSiteModeOperationError(
      'Scrivito.unstable_selectSiteId can only be called with a non-empty string'
    );
  }

  selectedSiteId().set(siteId);
}

/** Accessing the selected site ID only makes sense in the multi-site mode */
export function getUnstableSelectedSiteId(): string | null {
  // This should never happen!
  if (!getUnstableSiteIdForObjCallback) {
    // Calling getUnstableSelectedSiteId is only available in multi-site mode
    throw new InternalError();
  }

  return selectedSiteId().get() || null;
}

// For test purpose only.
export function resetUnstableMultiSiteMode(): void {
  getUnstableSiteIdForObjCallback = undefined;
}

const loadableCollection = new LoadableCollection({
  recordedAs: 'multiSiteMode',
  // the site id is not actually "loaded",
  // we are just waiting for the application to set it
  loadElement: () => ({
    loader: () => never<string>(),
  }),
});

function selectedSiteId() {
  return loadableCollection.get('selectedSiteId');
}

export function recognizeUnstableMultiSitePermalink(
  path: string,
  scope: ObjScope
): BasicObj | undefined {
  const siteId = getSiteIdAssumingSelected();
  const objs = getAllObjsByValueFrom(scope, '_permalink', path);

  const matchingObjs = objs.filter((obj) => {
    const objSiteId = getSiteIdForObj(obj);

    return objSiteId ? objSiteId === siteId : true;
  });

  const matchingNotDeletedObjs = matchingObjs.filter((obj) => !obj.isDeleted());

  return matchingNotDeletedObjs[0] ?? matchingObjs[0];
}

export function isGlobalOrFromUnstableSelectedSite(obj: BasicObj): boolean {
  const objSiteId = getSiteIdForObj(obj);
  const currentSiteId = getSiteIdAssumingSelected();

  return !objSiteId || objSiteId === currentSiteId;
}

function getSiteIdAssumingSelected(): string | null {
  const siteId = loadableWithDefault(undefined, getUnstableSelectedSiteId);

  if (siteId === undefined) {
    throw new ScrivitoError(
      'Access to routing in the multi-site mode, but the site ID is not yet selected.' +
        ' Forgot to use Scrivito.unstable_selectSiteId?'
    );
  }

  return siteId;
}

onReset(resetUnstableMultiSiteMode);
