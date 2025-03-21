import { getUserInfoPath } from 'scrivito_sdk/app_support/user_info';
import { JrRestApi } from 'scrivito_sdk/client';
import { setInterval } from 'scrivito_sdk/common';

let userLoggedInStatusInterval: number | undefined;

export function startPollingLoggedInUser(): void {
  if (userLoggedInStatusInterval) return;

  userLoggedInStatusInterval = setInterval(fetchLoggedInUser, 60000);
}

export async function fetchLoggedInUser(): Promise<void> {
  await JrRestApi.get(await getUserInfoPath());
}

// For test purposes only
export function disableUserIsLoggedInPoll(): void {
  if (userLoggedInStatusInterval) clearInterval(userLoggedInStatusInterval);
  userLoggedInStatusInterval = undefined;
}
