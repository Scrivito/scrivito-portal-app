import { AuthorizationProvider } from 'scrivito_sdk/client';
import { ConfigStore } from 'scrivito_sdk/common';

interface ClientConfig {
  iamAuthLocation?: string;
  iamAuthProvider?: AuthorizationProvider;
  loginHandler?: 'redirect' | 'error';
}

export const clientConfig = new ConfigStore<ClientConfig>();
