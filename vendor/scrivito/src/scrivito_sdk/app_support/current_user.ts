import { User } from 'scrivito_sdk/app_support/user';
import { getUserInfo } from 'scrivito_sdk/app_support/userinfo';
import { ClientError } from 'scrivito_sdk/client';

/** @public */
export function currentUser(): User | null {
  const userData = getUserData();
  return userData ? new User(userData) : null;
}

function getUserData() {
  try {
    const userInfo = getUserInfo();

    if (!userInfo) return null;

    const { sub: id, name, email } = userInfo;

    return { id, name, email };
  } catch (error: unknown) {
    if (error instanceof ClientError && error.code === 'auth_missing') {
      return null;
    }

    throw error;
  }
}
