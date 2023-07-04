import { getConfiguration } from 'scrivito_sdk/app_support/configure';
import { User, UserData } from 'scrivito_sdk/app_support/user';
import { ClientError, getWithoutLoginRedirect } from 'scrivito_sdk/client';
import { LoadableData } from 'scrivito_sdk/loadable';
import { createStateContainer } from 'scrivito_sdk/state';

export interface UserInfo {
  sub: string;
  name: string;
  email: string;
}

/** @public */
export function currentUser(): User | null {
  const userData = loadableUserData.get();
  return userData ? new User(userData) : null;
}

export async function getUserInfoPath(): Promise<string> {
  const { tenant: instanceId } = await getConfiguration();
  return `iam/instances/${instanceId}/userinfo`;
}

// For test purpose only
export function setCurrentUserData(userData: UserData | null): void {
  loadableUserData.set(userData);
}

const loadableUserData = new LoadableData<UserData | null>({
  state: createStateContainer(),
  loader: getUserData,
});

async function getUserData() {
  try {
    const {
      sub: id,
      name,
      email,
    } = (await getWithoutLoginRedirect(await getUserInfoPath())) as UserInfo;

    return { id, name, email };
  } catch (error: unknown) {
    if (error instanceof ClientError && error.code === 'auth_missing') {
      return null;
    }

    throw error;
  }
}
