import { checkArgumentsFor, tcomb as t } from 'scrivito_sdk/common';
import { createStateContainer } from 'scrivito_sdk/state';
import { AuthGroups } from 'scrivito_sdk/ui_interface/app_adapter';

const authGroupsState = createStateContainer<AuthGroups>();

/** @public */
export function provideAuthGroups(authGroups: AuthGroups): void;

/** @internal */
export function provideAuthGroups(
  authGroups: AuthGroups,
  ...excessArgs: never[]
): void {
  checkProvideAuthGroups(authGroups, ...excessArgs);
  authGroupsState.set(authGroups);
}

export function getAuthGroups(): AuthGroups | undefined {
  return authGroupsState.get();
}

const checkProvideAuthGroups = checkArgumentsFor(
  'provideAuthGroups',
  [['authGroups', t.dict(t.String, t.String)]],
  { docPermalink: 'js-sdk/provideAuthGroups' }
);
