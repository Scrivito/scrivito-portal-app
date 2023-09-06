import * as React from 'react';

import { isLayoutEditingActive } from 'scrivito_sdk/app_support/layout_editing';
import { InPlaceEditingEnabledContext } from 'scrivito_sdk/react/in_place_editing_enabled_context';
import { IsInsideLayoutContext } from 'scrivito_sdk/react/is_inside_layout_context';

export function useLayoutAwareInPlaceEditing(): boolean {
  const inPlaceEditingEnabled = React.useContext(InPlaceEditingEnabledContext);
  const isInsideLayoutContext = React.useContext(IsInsideLayoutContext);

  return (
    inPlaceEditingEnabled &&
    (isLayoutEditingActive() === null ||
      isInsideLayoutContext === isLayoutEditingActive())
  );
}
