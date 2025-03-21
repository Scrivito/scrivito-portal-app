import { checkIfTrustedOrigin } from 'scrivito_sdk/app_support/trusted_ui_origins';
import { UiAdapterClient } from 'scrivito_sdk/app_support/ui_adapter';
import { uiAdapterDescription } from 'scrivito_sdk/app_ui_protocol';
import {
  AdapterDescription,
  anticipatedMessageLink,
  connectTo,
  createAdapterClient,
  createAdapterMessageClient,
  linkViaPort,
  postMessageLinkFor,
} from 'scrivito_sdk/bridge';
import { ScrivitoError, getScrivitoVersion } from 'scrivito_sdk/common';

export function establishUiConnection(uiWindow: Window): UiAdapterClient {
  const promiseForMessagePort = connectTo(
    uiWindow,
    postMessageLinkFor(window),
    {
      clientVersion: getScrivitoVersion(),
      clientCapabilities: ['adapterSpec'],
    }
  ).then(({ port, origin }) => {
    return checkIfTrustedOrigin(origin).then((trusted) => {
      if (!trusted) {
        throw new ScrivitoError(
          `Refusing to connect to Scrivito UI at unknown origin ${origin}.`
        );
      }

      return port;
    });
  });

  return createAdapterClient(
    uiAdapterDescription,
    createAdapterMessageClient<
      UiAdapterClient,
      AdapterDescription<UiAdapterClient>
    >(anticipatedMessageLink(promiseForMessagePort.then(linkViaPort)))
  );
}
