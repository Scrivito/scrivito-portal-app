import * as React from 'react';

import { isInPlaceEditingActive } from 'scrivito_sdk/app_support/editing_context';
import { EditAsPageContentContext } from 'scrivito_sdk/react/edit_as_page_content_context';

/** @public */
export const InPlaceEditAsPageContent: React.FC<React.PropsWithChildren> = ({
  children,
}) =>
  isInPlaceEditingActive() ? (
    <EditAsPageContentContext.Provider value={true}>
      {children}
    </EditAsPageContentContext.Provider>
  ) : (
    <>{children}</>
  );
