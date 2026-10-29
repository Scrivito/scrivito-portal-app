import { onReset } from 'scrivito_sdk/common';
import { ObjJsonPatch } from 'scrivito_sdk/data/obj_patch';

export type PublishedWriteHandler = (
  objId: string,
  patch: ObjJsonPatch,
) => Promise<void>;

let publishedWriteHandler: PublishedWriteHandler | undefined;

export function setPublishedWriteHandler(
  handler: PublishedWriteHandler | undefined,
): void {
  publishedWriteHandler = handler;
}

export function getPublishedWriteHandler(): PublishedWriteHandler | undefined {
  return publishedWriteHandler;
}

onReset(() => {
  publishedWriteHandler = undefined;
});
