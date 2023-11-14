import type { ApiKeyAuthorizationProvider } from 'scrivito_sdk/node_support/api_key_authorization_provider';
import type { nodeAuthHandler } from 'scrivito_sdk/node_support/node_auth_handler';

export let nodeAdapter: NodeAdapter | undefined;

export interface NodeAdapter {
  ApiKeyAuthorizationProvider: typeof ApiKeyAuthorizationProvider;
  nodeAuthHandler: typeof nodeAuthHandler;
}

export function setNodeAdapter(adapter: NodeAdapter | undefined) {
  nodeAdapter = adapter;
}

export function isRunningInBrowser() {
  return nodeAdapter === undefined;
}
