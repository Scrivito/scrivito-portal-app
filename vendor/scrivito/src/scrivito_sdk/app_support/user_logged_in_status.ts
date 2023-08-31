import { getUserInfoPath } from 'scrivito_sdk/app_support/userinfo';
import { JrRestApi } from 'scrivito_sdk/client';

let userLoggedInStatusInterval: NodeJS.Timeout | undefined;

export function startPollingLoggedUser(): void {
  if (userLoggedInStatusInterval) return;

  userLoggedInStatusInterval = setInterval(fetchLoggedUser, 60000);
}

export async function fetchLoggedUser(): Promise<void> {
  await JrRestApi.get(getUserInfoPath());
}

// For test purposes only
export function stopPollingLoggedUser(): void {
  if (userLoggedInStatusInterval) clearInterval(userLoggedInStatusInterval);
  userLoggedInStatusInterval = undefined;
}
