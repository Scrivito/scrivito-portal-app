import * as React from 'react';

import { getEditableArea } from 'scrivito_sdk/app_support/editable_area';
import { CurrentEditableAreaContext } from 'scrivito_sdk/react/current_editable_area_context';
import { InPlaceEditingEnabledContext } from 'scrivito_sdk/react/in_place_editing_enabled_context';

export function useInPlaceEditing(): boolean {
  const currentEditableArea = React.useContext(CurrentEditableAreaContext);
  const inPlaceEditingEnabled = React.useContext(InPlaceEditingEnabledContext);
  if (!inPlaceEditingEnabled) return false;

  switch (getEditableArea()) {
    case 'layout':
      return (
        currentEditableArea === 'outermostLayout' ||
        currentEditableArea === 'currentPageLayout'
      );
    case 'page':
      return currentEditableArea === 'currentPage';
    default:
      return true;
  }
}
