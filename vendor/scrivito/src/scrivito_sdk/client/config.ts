import { BrowserTokenParams } from 'scrivito_sdk/client';
import { ConfigStore } from 'scrivito_sdk/common';

export type TokenFetcher = (
  params: BrowserTokenParams
) => Promise<string | null>;

interface ClientConfig {
  iamAuthLocation?: string;
  iamTokenFetcher?: TokenFetcher;
  loginHandler?: 'redirect' | 'error';
}

export const clientConfig = new ConfigStore<ClientConfig>();
