import type { FC, PropsWithChildren, ReactNode } from 'react';

import { isInPlaceEditingActive } from 'scrivito_sdk/app_support/editing_context';
import { InPlaceEditingEnabledContext } from 'scrivito_sdk/react/in_place_editing_enabled_context';

/** @public */
export const InPlaceEditingOff: FC<PropsWithChildren> =
  createInPlaceEditingToggle({ value: false });

/** @public */
export const RestoreInPlaceEditing: FC<PropsWithChildren> =
  createInPlaceEditingToggle({ value: true });

function createInPlaceEditingToggle({ value }: { value: boolean }) {
  return ({ children }: { children: ReactNode }) =>
    isInPlaceEditingActive() ? (
      <InPlaceEditingEnabledContext.Provider
        value={value}
        children={children}
      />
    ) : (
      <>{children}</>
    );
}
