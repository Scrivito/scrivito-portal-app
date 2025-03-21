import * as React from 'react';

import { isInPlaceEditingActive } from 'scrivito_sdk/app_support/editing_context';
import { InPlaceEditingEnabledContext } from 'scrivito_sdk/react/in_place_editing_enabled_context';

/** @public */
export function InPlaceEditingOff({ children }: { children: React.ReactNode }) {
  return isInPlaceEditingActive() ? (
    <InPlaceEditingEnabledContext.Provider children={children} value={false} />
  ) : (
    (children as ReactChildren)
  );
}

/** @public */
export function RestoreInPlaceEditing({
  children,
}: {
  children: React.ReactNode;
}) {
  return isInPlaceEditingActive() ? (
    <InPlaceEditingEnabledContext.Provider children={children} value={true} />
  ) : (
    (children as ReactChildren)
  );
}
// can be deleted after https://github.com/DefinitelyTyped/DefinitelyTyped/issues/18051 is fixed
type ReactChildren = React.ReactElement<unknown> | null;
