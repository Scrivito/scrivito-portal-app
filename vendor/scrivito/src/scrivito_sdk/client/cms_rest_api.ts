import { RequestFailedError, fetchJson } from 'scrivito_sdk/client';
import { ClientError } from 'scrivito_sdk/client/client_error';
import { getClientVersion } from 'scrivito_sdk/client/get_client_version';
import { withLoginHandler } from 'scrivito_sdk/client/login_handler';
import { loginRedirectHandler } from 'scrivito_sdk/client/login_redirect_handler';
import { PublicAuthentication } from 'scrivito_sdk/client/public_authentication';
import {
  Deferred,
  InternalError,
  ScrivitoError,
  fetchConfiguredTenant,
  onReset,
  wait,
} from 'scrivito_sdk/common';

export class MissingWorkspaceError extends ScrivitoError {}

export interface AuthorizationProvider {
  currentState?: () => string | null;
  authorize: (
    request: (auth: string | undefined) => Promise<Response>
  ) => Promise<Response>;
}

export type BackendResponse = unknown;

type ParamsType = unknown;

interface SuccessfulTaskData {
  status: 'success';
  result: unknown;
}

interface OpenTaskData {
  status: 'open';
  id: string;
}

interface FailedTaskData {
  status: 'error';
  message: string;
  code: string;
}

interface ExceptionTaskData {
  status: 'exception';
  message: string;
}

type TaskData =
  | OpenTaskData
  | SuccessfulTaskData
  | FailedTaskData
  | ExceptionTaskData;

interface TaskResponse {
  task: TaskData;
}

export interface VisitorSession {
  id: string;
  role: 'visitor';
  token: string;
  maxage: number;
}

let requestsAreDisabled: true | undefined;

export type Priority = 'foreground' | 'background';

let fallbackPriority: undefined | Priority;

export function useDefaultPriority(priority: Priority) {
  fallbackPriority = priority;
}

export type AnalyticsData =
  | {
      loadId: number;
      urlPath: string;
      nav: number;
    }
  | { loadId: number };

type AnalyticsProvider = () => AnalyticsData;

interface CmsRestApiConfig {
  apiBaseUrl: string;
  analyticsProvider?: AnalyticsProvider;
  accessAsEditor?: boolean;
  priority?: Priority;
  authorizationProvider: AuthorizationProvider;
}

class CmsRestApi {
  // only public for test purposes
  config?: CmsRestApiConfig;
  private configDeferred: Deferred<CmsRestApiConfig>;

  constructor() {
    this.configDeferred = new Deferred();
  }

  init({
    apiBaseUrl,
    authorizationProvider,
    priority,
    accessAsEditor,
    analyticsProvider,
  }: {
    apiBaseUrl: string;
    authorizationProvider?: AuthorizationProvider;
    priority?: Priority;
    accessAsEditor?: boolean;
    analyticsProvider?: AnalyticsProvider;
  }): void {
    this.config = {
      apiBaseUrl,
      analyticsProvider,
      accessAsEditor,
      priority,
      authorizationProvider: authorizationProvider ?? PublicAuthentication,
    };
    this.configDeferred.resolve(this.config);
  }

  rejectRequests(): void {
    requestsAreDisabled = true;
  }

  async get(
    path: string,
    requestParams?: ParamsType
  ): Promise<BackendResponse> {
    return this.requestWithTaskHandling({ method: 'GET', path, requestParams });
  }

  async put(
    path: string,
    requestParams?: ParamsType
  ): Promise<BackendResponse> {
    return this.requestWithTaskHandling({ method: 'PUT', path, requestParams });
  }

  async post(
    path: string,
    requestParams?: ParamsType
  ): Promise<BackendResponse> {
    return this.requestWithTaskHandling({
      method: 'POST',
      path,
      requestParams,
    });
  }

  async delete(
    path: string,
    requestParams?: ParamsType
  ): Promise<BackendResponse> {
    return this.requestWithTaskHandling({
      method: 'DELETE',
      path,
      requestParams,
    });
  }

  async requestVisitorSession(
    sessionId: string,
    token: string
  ): Promise<VisitorSession> {
    return this.request({
      method: 'PUT',
      path: `sessions/${sessionId}`,
      authorizationProvider: {
        authorize(request) {
          return request(`id_token ${token}`);
        },
      },
    }) as Promise<VisitorSession>;
  }

  // For test purpose only.
  currentPublicAuthorizationState(): string {
    if (this.config?.authorizationProvider) {
      if (this.config?.authorizationProvider.currentState) {
        return `[API] ${
          this.config?.authorizationProvider.currentState() ?? 'null'
        }`;
      }
      return '[API]: authorization provider without currentState()';
    }
    return '[API]: no authorization provider';
  }

  private async requestWithTaskHandling({
    method,
    path,
    requestParams,
  }: {
    method: string;
    path: string;
    requestParams?: ParamsType;
  }): Promise<BackendResponse> {
    const result = await this.request({ method, path, requestParams });

    return isTaskResponse(result) ? this.handleTask(result.task) : result;
  }

  private async request({
    method,
    path,
    requestParams,
    authorizationProvider,
  }: {
    method: string;
    path: string;
    requestParams?: ParamsType;
    authorizationProvider?: AuthorizationProvider | null;
  }): Promise<BackendResponse> {
    if (requestsAreDisabled) {
      // When connected to a UI, all communications of an SDK app with the backend
      // must go through the UI adapter.
      throw new InternalError('Unexpected CMS backend access.');
    }

    const config = await this.configDeferred.promise;
    const tenant = await fetchConfiguredTenant();
    const url = `${config.apiBaseUrl}/tenants/${tenant}/perform`;

    try {
      return await withLoginHandler(
        loginRedirectHandler,
        () =>
          fetchJson(url, {
            method: method === 'POST' ? 'POST' : 'PUT',
            headers: getHeaders(config),
            data: {
              path,
              verb: method,
              params: requestParams,
              ...(config.analyticsProvider && config.analyticsProvider()),
            },
            authProvider: getAuthorizationProviderForRequest(
              authorizationProvider,
              config
            ),
            credentials: 'omit',
          }) as Promise<Response>
      );
    } catch (error) {
      throw error instanceof ClientError &&
        error.code === 'precondition_not_met.workspace_not_found'
        ? new MissingWorkspaceError()
        : error;
    }
  }

  private async handleTask(task: TaskData): Promise<BackendResponse> {
    switch (task.status) {
      case 'success':
        return task.result;
      case 'error':
        throw new ClientError(task.message, task.code, {});
      case 'exception':
        throw new RequestFailedError(task.message);
      case 'open': {
        await wait(2);

        const result = await this.get(`tasks/${task.id}`);
        return this.handleTask(result as TaskData);
      }
      default:
        throw new RequestFailedError('Invalid task response (unknown status)');
    }
  }
}

function getHeaders(config: CmsRestApiConfig) {
  let headers: Record<string, string> = {
    'Scrivito-Client': getClientVersion(),
  };

  const priorityWithFallback = config.priority || fallbackPriority;
  if (priorityWithFallback === 'background') {
    headers = {
      ...headers,
      'Scrivito-Priority': priorityWithFallback,
    };
  }

  if (config.accessAsEditor) {
    headers = {
      ...headers,
      'Scrivito-Access-As': 'editor',
    };
  }

  return headers;
}

function getAuthorizationProviderForRequest(
  authorizationProvider: AuthorizationProvider | null | undefined,
  config: CmsRestApiConfig
) {
  if (authorizationProvider === undefined) {
    return config.authorizationProvider;
  }
  if (authorizationProvider === null) return undefined;

  return authorizationProvider;
}

function isTaskResponse(result: unknown): result is TaskResponse {
  return (
    !!result &&
    !!(result as TaskResponse).task &&
    Object.keys(result as TaskResponse).length === 1
  );
}

export let cmsRestApi = new CmsRestApi();

// For test purpose only.
export function resetCmsRestApi(): void {
  cmsRestApi = new CmsRestApi();
  requestsAreDisabled = undefined;
}

onReset(resetCmsRestApi);
