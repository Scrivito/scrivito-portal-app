import * as React from 'react';

import { isInPlaceEditingActive } from 'scrivito_sdk/app_support/editing_context';
import { EditAsPageContentContext } from 'scrivito_sdk/react/edit_as_page_content_context';

/** @public */
export function InPlaceEditAsPageContent({
  children,
}: {
  children: React.ReactNode;
}) {
  return isInPlaceEditingActive() ? (
    <EditAsPageContentContext.Provider children={children} value={true} />
  ) : (
    children
  );
}
