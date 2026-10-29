import { createStateContainer } from 'scrivito_sdk/state';
import { AuthGroups } from 'scrivito_sdk/ui_interface/app_adapter';

const authGroupsState = createStateContainer<AuthGroups>();

/** @public */
export function provideAuthGroups(authGroups: AuthGroups): void {
  authGroupsState.set(authGroups);
}

export function getAuthGroups(): AuthGroups | undefined {
  return authGroupsState.get();
}
