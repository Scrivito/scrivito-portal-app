import { getConfiguration } from 'scrivito_sdk/app_support/configure';

import { getInstanceId } from 'scrivito_sdk/app_support/get_instance_id';
import { isSelectedObjMessage } from 'scrivito_sdk/app_ui_protocol';
import { postMessageLinkFor } from 'scrivito_sdk/bridge';
import { load } from 'scrivito_sdk/loadable';
import { Obj } from 'scrivito_sdk/realm';

/** @beta */
export async function selectImageFromContentBrowser(): Promise<Obj | null> {
  const configuration = await getConfiguration();

  const adoptUi = configuration.adoptUi;
  const uiDomain =
    typeof adoptUi === 'string' ? adoptUi : 'https://edit.scrivito.com';

  const selectImageUrl = `${uiDomain}/${getInstanceId()}/selectImage~`;

  const uiWindow = window.open(selectImageUrl, '_blank');
  if (!uiWindow) throw new Error('Failed to open UI window');

  const message = await postMessageLinkFor(window)
    .incomingMessages.filter((event) => event.remoteWindow === uiWindow)
    .map((event) => event.data)
    .filter(isSelectedObjMessage)
    .waitForFirst();

  uiWindow.close();

  const selectedId = message.objId;
  if (!selectedId) return null;

  return await load(() => Obj.onAllSites().get(selectedId));
}
