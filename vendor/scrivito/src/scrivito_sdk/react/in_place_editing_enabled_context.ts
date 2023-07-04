import { createConnectedContext } from 'scrivito_sdk/react/create_connected_context';

export const {
  Consumer: InPlaceEditingEnabledContextConsumer,
  Provider: InPlaceEditingEnabledContextProvider,
} = createConnectedContext(true);
