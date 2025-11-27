import * as React from 'react';

import { isInPlaceEditingActive } from 'scrivito_sdk/app_support/editing_context';
import { connect } from 'scrivito_sdk/react_connect';

type ContextValue =
  | 'outermostLayout'
  | 'parentPageLayout'
  | 'currentPageLayout'
  | 'currentPage';

const Context = React.createContext<ContextValue>('outermostLayout');

export const CurrentEditableArea = connect(function CurrentEditableArea({
  value,
  children,
}: {
  value: ContextValue | (() => ContextValue);
  children: React.ReactNode;
}) {
  if (isInPlaceEditingActive()) {
    return (
      <Context.Provider value={typeof value === 'function' ? value() : value}>
        {children}
      </Context.Provider>
    );
  }

  return <>{children}</>;
});

export function useCurrentEditableArea(): ContextValue {
  return React.useContext(Context);
}
