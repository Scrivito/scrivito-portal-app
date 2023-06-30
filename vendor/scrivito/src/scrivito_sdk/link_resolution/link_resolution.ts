// @rewire
import { ObjSpaceId, withEachAttributeJson } from 'scrivito_sdk/client';
import { InternalError, ScrivitoPromise } from 'scrivito_sdk/common';
import { ObjData, getObjData } from 'scrivito_sdk/data';
import {
  isAnyLinkResolutionAttributeJson,
  runWorker,
} from 'scrivito_sdk/link_resolution/link_resolution_worker';
import { load } from 'scrivito_sdk/loadable';

type WriteMonitorNotification = (p: Promise<void>) => void;

let notifyWriteMonitor: WriteMonitorNotification | undefined;

export function setupWriteMonitorNotification(
  notification: WriteMonitorNotification
): void {
  if (notifyWriteMonitor) {
    // Write monitoring notification is already injected
    throw new InternalError();
  }
  notifyWriteMonitor = notification;
}

let linkResolutions: { [workspaceId: string]: LinkResolution | undefined } = {};

export function startLinkResolutionFor(
  workspaceId: string,
  objId: string
): void {
  linkResolutionFor(workspaceId).start(objId);
}

export function finishLinkResolutionFor(
  workspaceId: string,
  objId: string
): Promise<void> {
  return linkResolutionFor(workspaceId).finish(objId);
}

// For test purpose only.
export function reset() {
  notifyWriteMonitor = undefined;
  linkResolutions = {};
}

function linkResolutionFor(workspaceId: string) {
  if (!linkResolutions[workspaceId]) {
    linkResolutions[workspaceId] = new LinkResolution([
      'workspace',
      workspaceId,
    ]);
  }

  return linkResolutions[workspaceId]!;
}

class LinkResolution {
  private readonly cache: { [key: string]: Promise<void> | undefined } = {};

  constructor(private readonly objSpaceId: ObjSpaceId) {}

  start(objId: string): void {
    const promise = load(() => getObjData(this.objSpaceId, objId)).then(
      performResolution
    );

    const priorPromise = this.cache[objId];
    const combinedPromise = priorPromise
      ? ScrivitoPromise.all([priorPromise, promise]).then(() => undefined)
      : promise;
    this.cache[objId] = combinedPromise;

    notifyLinkResolutionIsActive(combinedPromise);
  }

  finish(objId: string): Promise<void> {
    return this.cache[objId] || ScrivitoPromise.resolve();
  }
}

function notifyLinkResolutionIsActive(promise: Promise<void>) {
  if (!notifyWriteMonitor) {
    // No write monitor notification was set up for link resolution.
    throw new InternalError();
  }

  notifyWriteMonitor(promise);
}

function performResolution(objData: ObjData | undefined) {
  if (!objData) return;

  const objJson = objData.get();
  if (!objJson) return;

  const workers: Array<Promise<void>> = [];
  withEachAttributeJson(objJson, (attributeJson, attributeName, widgetId) => {
    if (!isAnyLinkResolutionAttributeJson(attributeJson)) return;

    workers.push(runWorker(attributeJson, objData, attributeName, widgetId));
  });

  if (!workers.length) return;

  const resolution = ScrivitoPromise.all(workers);

  // don't resolve with Array
  return resolution.then(() => undefined);
}
