import { NodeAdapter } from 'scrivito_sdk/app_support/node_adapter';
import { ApiKeyAuthorizationProvider } from 'scrivito_sdk/node_support/api_key_authorization_provider';
import { nodeAuthHandler } from 'scrivito_sdk/node_support/node_auth_handler';

export const nodeAdapter: NodeAdapter = {
  ApiKeyAuthorizationProvider,
  nodeAuthHandler,
};
