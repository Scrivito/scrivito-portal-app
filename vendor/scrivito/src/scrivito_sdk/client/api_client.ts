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

export interface FetchOptions {
  audience?: string;
  headers?: Record<string, string>;
  params?: FetchParams;
  data?: FetchData;
  method?: Method;
  // note: only for internal use, will be removed in the future
  loginHandler?: LoginHandler;
  // special "escape hatch" only meant for console.justrelate.com
  unstable_forceCookie?: true;
}

// exported for test purposes only
export type Fetch = (path: string, options?: FetchOptions) => Promise<unknown>;

/** @public */
export interface ApiClientOptions {
  audience?: string;
  headers?: Record<string, string>;
}

/** given a 'fetch' method, construct an ApiClient which offers convenience
 * methods for getting, putting etc.
 */
export class ApiClient {
  constructor(
    private readonly fetchCallback: Fetch,
    private readonly options?: ApiClientOptions
  ) {}

  fetch(path: string, options?: FetchOptions) {
    return this.fetchCallback(path, {
      ...this.options,
      ...options,
    });
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
