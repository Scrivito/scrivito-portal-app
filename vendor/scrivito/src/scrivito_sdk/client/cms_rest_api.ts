import { RequestFailedError } from 'scrivito_sdk/client';
import { ClientError } from 'scrivito_sdk/client/client_error';
import { FetchOptions, Priority, fetch } from 'scrivito_sdk/client/fetch';
import {
  LoginHandler,
  withLoginHandler,
} from 'scrivito_sdk/client/login_handler';
import { loginRedirectHandler } from 'scrivito_sdk/client/login_redirect_handler';
import {
  requestApiIdempotent,
  requestApiNonIdempotent,
} from 'scrivito_sdk/client/request_api';
import { SessionData } from 'scrivito_sdk/client/session_data';
import {
  Deferred,
  InternalError,
  ScrivitoError,
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

class CmsRestApi {
  // only public for test purposes
  url!: string;
  // only public for test purposes
  priority?: Priority;

  private authHeaderValueProvider?: AuthorizationProvider;
  private initDeferred: Deferred;

  constructor() {
    this.initDeferred = new Deferred();
  }

  init({
    apiBaseUrl,
    authProvider,
  }: {
    apiBaseUrl: string;
    authProvider: AuthorizationProvider;
  }): void {
    this.url = `${apiBaseUrl}/perform`;
    this.authHeaderValueProvider = authProvider;
    this.initDeferred.resolve();
  }

  rejectRequests(): void {
    requestsAreDisabled = true;
  }

  setPriority(priority: Priority): void {
    this.priority = priority;
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

  async requestBuiltInUserSession(
    sessionId: string,
    idp?: string
  ): Promise<SessionData> {
    const response = await this.request({
      method: 'PUT',
      path: `sessions/${sessionId}`,
      requestParams: idp ? { idp, type: 'iam' } : { type: 'iam' },
      loginHandler: loginRedirectHandler,
      providedAuthorization: null,
    });

    return response as SessionData;
  }

  async requestVisitorSession(
    sessionId: string,
    token: string
  ): Promise<VisitorSession> {
    return this.request({
      method: 'PUT',
      path: `sessions/${sessionId}`,
      requestParams: undefined,
      providedAuthorization: `id_token ${token}`,
    }) as Promise<VisitorSession>;
  }

  // For test purpose only.
  currentPublicAuthorizationState(): string {
    if (this.authHeaderValueProvider) {
      if (this.authHeaderValueProvider.currentState) {
        return `[API] ${this.authHeaderValueProvider.currentState() ?? 'null'}`;
      }
      return '[API]: authorization provider without currentState()';
    }
    return '[API]: no authorization provider';
  }

  private async ensureEnabledAndInitialized(): Promise<void> {
    if (requestsAreDisabled) {
      // When connected to a UI, all communications of an SDK app with the backend
      // must go through the UI adapter.
      throw new InternalError('Unexpected CMS backend access.');
    }
    return this.initDeferred.promise;
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
    providedAuthorization,
    loginHandler,
  }: {
    method: string;
    path: string;
    requestParams?: ParamsType;
    providedAuthorization?: string | null;
    loginHandler?: LoginHandler;
  }): Promise<BackendResponse> {
    await this.ensureEnabledAndInitialized();

    const sendRequest = () =>
      this.requestWithAuthorization(
        providedAuthorization === undefined
          ? this.getAuthHeaderValueProvider()
          : providedAuthorization,
        (authorization) =>
          this.requestAndConvertToRawResponse({
            method,
            path,
            requestParams,
            authorization,
          })
      );

    try {
      return await withLoginHandler(loginHandler, () =>
        method === 'POST'
          ? requestApiNonIdempotent(sendRequest)
          : requestApiIdempotent(sendRequest)
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

  private async requestWithAuthorization(
    providedAuthorization: null | string | AuthorizationProvider,
    request: (authorization?: string) => Promise<Response>
  ) {
    if (providedAuthorization === null) return request();

    return typeof providedAuthorization === 'string'
      ? request(providedAuthorization)
      : providedAuthorization.authorize(request);
  }

  private async requestAndConvertToRawResponse({
    method,
    path,
    requestParams,
    authorization,
  }: {
    method: string;
    path: string;
    requestParams?: ParamsType;
    authorization: string | undefined;
  }): Promise<Response> {
    const options: FetchOptions = {
      authorization,
      params: {
        path,
        verb: method,
        params: requestParams || {},
      },
    };

    if (this.priority) options.priority = this.priority;

    const fetchResponse = await fetch(method, this.url, options);

    const { responseText, status } = fetchResponse;

    return new Response(responseText, { status });
  }

  private getAuthHeaderValueProvider() {
    if (!this.authHeaderValueProvider) throw new InternalError();

    return this.authHeaderValueProvider;
  }
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

export async function requestBuiltInUserSession(
  sessionId: string,
  idp?: string
): Promise<SessionData> {
  return cmsRestApi.requestBuiltInUserSession(sessionId, idp);
}
