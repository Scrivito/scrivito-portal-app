import { isSelectedObjMessage } from 'scrivito_sdk/app_ui_protocol';
import { postMessageLinkFor } from 'scrivito_sdk/bridge';
import { Subscription } from 'scrivito_sdk/common';
import { load } from 'scrivito_sdk/loadable';
import { Obj } from 'scrivito_sdk/realm';

export function observeSelectedImage(
  isFromSource: (source: Window) => boolean,
  onSelect: (image: Obj | null) => void,
): Subscription {
  return postMessageLinkFor(window)
    .incomingMessages.filter((event) => isFromSource(event.remoteWindow))
    .map((event) => event.data)
    .filter(isSelectedObjMessage)
    .takeOne()
    .subscribe(async (message) => {
      const objId = message.objId;
      const image = objId
        ? await load(() => Obj.onAllSites().get(objId))
        : null;

      onSelect(image);
    });
}
