import { EnsureUserIsLoggedInParams } from 'scrivito_sdk/app_support/auth_handler';
import { getUserInfoPath } from 'scrivito_sdk/app_support/user_info';
import { JrRestApi } from 'scrivito_sdk/client';
import { TimeoutType, setInterval } from 'scrivito_sdk/common';

let userLoggedInStatusInterval: TimeoutType | undefined;

export function startPollingLoggedInUser(): void {
  if (userLoggedInStatusInterval) return;

  userLoggedInStatusInterval = setInterval(fetchLoggedInUser, 60000);
}

export async function fetchLoggedInUser(
  params?: EnsureUserIsLoggedInParams
): Promise<void> {
  await JrRestApi.get(await getUserInfoPath(), params);
}

// For test purposes only
export function disableUserIsLoggedInPoll(): void {
  if (userLoggedInStatusInterval) clearInterval(userLoggedInStatusInterval);
  userLoggedInStatusInterval = undefined;
}
