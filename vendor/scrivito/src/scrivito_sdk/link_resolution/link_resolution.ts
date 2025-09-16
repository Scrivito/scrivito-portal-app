// @rewire
import { ObjSpaceId, withEachAttributeJson } from 'scrivito_sdk/client';
import { InternalError, computeCacheKey, onReset } from 'scrivito_sdk/common';
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

let linkResolutions: { [objSpaceKey: string]: LinkResolution | undefined } = {};

export function startLinkResolutionFor(
  objSpace: ObjSpaceId,
  objId: string
): void {
  linkResolutionFor(objSpace).start(objId);
}

export function finishLinkResolutionFor(
  objSpace: ObjSpaceId,
  objId: string
): Promise<void> {
  return linkResolutionFor(objSpace).finish(objId);
}

// For test purpose only.
export function reset() {
  notifyWriteMonitor = undefined;
  linkResolutions = {};
}

function linkResolutionFor(objSpace: ObjSpaceId) {
  const objSpaceKey = computeCacheKey(objSpace);

  if (!linkResolutions[objSpaceKey]) {
    linkResolutions[objSpaceKey] = new LinkResolution(objSpace);
  }

  return linkResolutions[objSpaceKey]!;
}

class LinkResolution {
  private readonly cache: { [key: string]: Promise<void> | undefined } = {};

  constructor(private readonly objSpaceId: ObjSpaceId) {}

  async start(objId: string): Promise<void> {
    const promise = this.getDataAndPerformResolution(objId);
    const priorPromise = this.cache[objId];
    const combinedPromise = priorPromise
      ? (async () => {
          await Promise.all([priorPromise, promise]);
        })()
      : promise;
    this.cache[objId] = combinedPromise;

    notifyLinkResolutionIsActive(combinedPromise);
  }

  async finish(objId: string): Promise<void> {
    return this.cache[objId];
  }

  private async getDataAndPerformResolution(objId: string) {
    await performResolution(
      await load(() => getObjData(this.objSpaceId, objId))
    );
  }
}

function notifyLinkResolutionIsActive(promise: Promise<void>) {
  if (!notifyWriteMonitor) {
    // No write monitor notification was set up for link resolution.
    throw new InternalError();
  }

  notifyWriteMonitor(promise);
}

async function performResolution(objData: ObjData | undefined) {
  if (!objData) return;

  const objJson = objData.get();
  if (!objJson) return;

  const workers: Array<Promise<void>> = [];
  withEachAttributeJson(objJson, (attributeJson, attributeName, widgetId) => {
    if (!isAnyLinkResolutionAttributeJson(attributeJson)) return;

    workers.push(runWorker(attributeJson, objData, attributeName, widgetId));
  });

  if (workers.length) await Promise.all(workers);
}

onReset(reset);
