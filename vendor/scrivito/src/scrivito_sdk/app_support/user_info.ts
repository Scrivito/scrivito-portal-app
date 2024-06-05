import { JrRestApi } from 'scrivito_sdk/client';
import { fetchConfiguredTenant } from 'scrivito_sdk/common';
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

export async function getUserInfoPath(): Promise<string> {
  const tenant = await fetchConfiguredTenant();

  return `iam/instances/${tenant}/userinfo`;
}

// For test purposes only
export function setUserInfo(userinfo: UserInfo | null): void {
  loadableUserInfo.set(userinfo);
}

const loadableUserInfo = new LoadableData<UserInfo | null>({
  loader: async () =>
    JrRestApi.getWithoutLogin(await getUserInfoPath()) as Promise<UserInfo>,
});
