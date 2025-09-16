import merge from 'lodash-es/merge';

import { LoginHandler } from 'scrivito_sdk/client';

export interface FetchParams {
  [name: string]: string | null | undefined;
}

export interface FetchData {
  [name: string]: unknown;
}

type Method =
  | 'delete'
  | 'get'
  | 'patch'
  | 'post'
  | 'put'
  | 'DELETE'
  | 'GET'
  | 'PATCH'
  | 'POST'
  | 'PUT';

export type FetchOptions = FetchBaseOptions & AuthViaOptions;

interface FetchBaseOptions extends ApiClientBaseOptions {
  params?: FetchParams;
  data?: FetchData | FormData;
  method?: Method;
  // @internal
  idp?: string;
  // note: only for internal use, will be removed in the future
  loginHandler?: LoginHandler;
}

type AuthViaOptions =
  | {
      authViaAccount?: string;
      authViaInstance?: never;
    }
  | {
      authViaInstance?: string;
      authViaAccount?: never;
    };

function assertAuthViaOptions(
  options: MaybeInvalidAuthViaFetchConfig | undefined
): asserts options is AuthViaOptions {
  if (!options) return;

  const { authViaAccount, authViaInstance } = options;

  if (authViaAccount && authViaInstance) {
    throw new Error(
      'authViaAccount and authViaInstance are mutually exclusive'
    );
  }
}

type MaybeInvalidAuthViaFetchConfig = FetchBaseOptions & {
  authViaAccount?: string;
  authViaInstance?: string;
};

// exported for test purposes only
export type Fetch = (path: string, options?: FetchOptions) => Promise<unknown>;

/** @public */
export type ApiClientOptions = ApiClientBaseOptions & AuthViaOptions;

interface ApiClientBaseOptions {
  audience?: string;
  headers?: ApiClientHeaders;
  credentials?: RequestCredentials;
}

export type ApiClientHeaders =
  | HeadersInit
  | ({ Authorization: null } & Record<string, string | null>);

/** given a 'fetch' method, construct an ApiClient which offers convenience
 * methods for getting, putting etc.
 */
export class ApiClient {
  constructor(
    private readonly fetchCallback: Fetch,
    private readonly options?: ApiClientOptions
  ) {}

  fetch(path: string, options?: FetchOptions) {
    const mergedOptions: MaybeInvalidAuthViaFetchConfig = merge(
      {},
      this.options,
      options
    );

    assertAuthViaOptions(mergedOptions);

    return this.fetchCallback(path, mergedOptions);
  }

  get(path: string, options?: FetchOptions): Promise<unknown> {
    return this.fetch(path, { ...options, method: 'GET' });
  }

  // note: only for internal use. will be remove in the future.
  getWithoutLogin(path: string, options?: FetchOptions): Promise<unknown> {
    return this.fetch(path, {
      ...options,
      // return null if a request fails due to missing login
      loginHandler: async () => null,
    });
  }

  post(path: string, options?: FetchOptions): Promise<unknown> {
    return this.fetch(path, { ...options, method: 'POST' });
  }

  put(path: string, options?: FetchOptions): Promise<unknown> {
    return this.fetch(path, { ...options, method: 'PUT' });
  }

  patch(path: string, options?: FetchOptions): Promise<unknown> {
    return this.fetch(path, { ...options, method: 'PATCH' });
  }

  delete(path: string, options?: FetchOptions): Promise<unknown> {
    return this.fetch(path, { ...options, method: 'DELETE' });
  }
}
