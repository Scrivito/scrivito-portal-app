import * as React from 'react';

import { currentPage } from 'scrivito_sdk/app_support/current_page';
import { getEditableArea } from 'scrivito_sdk/app_support/editable_area';
import { BasicObj } from 'scrivito_sdk/models';
import { useCurrentEditableArea } from 'scrivito_sdk/react/components/current_editable_area';
import { EditAsPageContentContext } from 'scrivito_sdk/react/edit_as_page_content_context';
import { InPlaceEditingEnabledContext } from 'scrivito_sdk/react/in_place_editing_enabled_context';

export function useInPlaceEditing(page: BasicObj | null): boolean {
  const currentEditableArea = useCurrentEditableArea();

  const inPlaceEditingEnabled = React.useContext(InPlaceEditingEnabledContext);
  const editAsPageContent = React.useContext(EditAsPageContentContext);

  if (!inPlaceEditingEnabled) return false;
  if (page === null) return false;

  switch (getEditableArea()) {
    case 'layout':
      return (
        currentEditableArea === 'outermostLayout' ||
        currentEditableArea === 'currentPageLayout'
      );
    case 'page':
      return (
        (editAsPageContent || currentEditableArea === 'currentPage') &&
        isCurrentPage(page)
      );
    default:
      return true;
  }
}

function isCurrentPage(page?: BasicObj | null) {
  return !!(page && page.id() === currentPage()?.id());
}
