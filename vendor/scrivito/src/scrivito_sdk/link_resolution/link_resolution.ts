import { ObjSpaceId, withEachAttributeJson } from 'scrivito_sdk/client';
import { computeCacheKey, onReset } from 'scrivito_sdk/common';
import { ObjData, getObjData, observeWritingPromise } from 'scrivito_sdk/data';
import {
  isAnyLinkResolutionAttributeJson,
  runWorker,
} from 'scrivito_sdk/link_resolution/link_resolution_worker';
import { load } from 'scrivito_sdk/loadable';

let linkResolutions: { [objSpaceKey: string]: LinkResolution | undefined } = {};

export function startLinkResolutionFor(
  objSpace: ObjSpaceId,
  objId: string,
): void {
  linkResolutionFor(objSpace).start(objId);
}

export function finishLinkResolutionFor(
  objSpace: ObjSpaceId,
  objId: string,
): Promise<void> {
  return linkResolutionFor(objSpace).finish(objId);
}

// For test purpose only.
export function reset() {
  linkResolutions = {};
}

function linkResolutionFor(objSpace: ObjSpaceId) {
  const objSpaceKey = computeCacheKey(objSpace);

  if (!linkResolutions[objSpaceKey]) {
    linkResolutions[objSpaceKey] = new LinkResolution(objSpace);
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
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
      await load(() => getObjData(this.objSpaceId, objId)),
    );
  }
}

function notifyLinkResolutionIsActive(promise: Promise<void>) {
  observeWritingPromise(promise);
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
