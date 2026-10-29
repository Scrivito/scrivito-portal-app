import { type ReactNode, createContext, useContext } from 'react';

import { isInPlaceEditingActive } from 'scrivito_sdk/app_support/editing_context';
import { connect } from 'scrivito_sdk/react_connect';

type ContextValue =
  | 'outermostLayout'
  | 'parentPageLayout'
  | 'currentPageLayout'
  | 'currentPage';

const Context = createContext<ContextValue>('outermostLayout');

export const CurrentEditableArea = connect(function CurrentEditableArea({
  value,
  children,
}: {
  value: ContextValue | (() => ContextValue);
  children: ReactNode;
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
  return useContext(Context);
}
