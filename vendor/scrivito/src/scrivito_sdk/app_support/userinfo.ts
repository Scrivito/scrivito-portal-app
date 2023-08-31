import { getConfiguredTenant } from 'scrivito_sdk/app_support/configured_tenant';
import { getWithoutLoginRedirect } from 'scrivito_sdk/client';
import { LoadableData } from 'scrivito_sdk/loadable';

export interface UserInfo {
  sub: string;
  name: string;
  email: string;
  picture?: string;
}

export function getUserInfo(): UserInfo | null | undefined {
  return loadableUserInfo.get();
}

export function getUserInfoPath(): string {
  return `iam/instances/${getConfiguredTenant()}/userinfo`;
}

// For test purposes only
export function setUserInfo(userinfo: UserInfo | null): void {
  loadableUserInfo.set(userinfo);
}

const loadableUserInfo = new LoadableData<UserInfo | null>({
  loader: async () =>
    getWithoutLoginRedirect(getUserInfoPath()) as Promise<UserInfo>,
});
