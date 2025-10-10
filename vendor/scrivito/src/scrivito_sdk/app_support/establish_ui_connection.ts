import { checkIfTrustedOrigin } from 'scrivito_sdk/app_support/trusted_ui_origins';
import { UiAdapterClient } from 'scrivito_sdk/app_support/ui_adapter';
import { uiAdapterDescription } from 'scrivito_sdk/app_ui_protocol';
import {
  AdapterDescription,
  connectTo,
  initializeAdapterClient,
  postMessageLinkFor,
} from 'scrivito_sdk/bridge';
import { ScrivitoError, getScrivitoVersion } from 'scrivito_sdk/common';

export function establishUiConnection(uiWindow: Window): UiAdapterClient {
  const promiseForMessagePort = (async () => {
    const { port, origin } = await connectTo(
      uiWindow,
      postMessageLinkFor(window),
      {
        clientVersion: getScrivitoVersion(),
        clientCapabilities: ['adapterSpec'],
      }
    );

    const trusted = await checkIfTrustedOrigin(origin);
    if (!trusted) {
      throw new ScrivitoError(
        `Refusing to connect to Scrivito UI at unknown origin ${origin}.`
      );
    }

    return port;
  })();

  return initializeAdapterClient<
    UiAdapterClient,
    AdapterDescription<UiAdapterClient>
  >(uiAdapterDescription, promiseForMessagePort);
}
