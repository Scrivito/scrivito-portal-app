import * as React from 'react';

import { isCurrentHistoryState } from 'scrivito_sdk/app_support/browser_location';
import { getNotFoundErrorPageState } from 'scrivito_sdk/app_support/current_page_data';
import { PageScroll } from 'scrivito_sdk/react/components/page_scroll';
import { connect } from 'scrivito_sdk/react_connect';

interface NotFoundErrorPageProps {
  children?: React.ReactNode;
}

/** @public */
export const NotFoundErrorPage: React.ComponentType<NotFoundErrorPageProps> =
  connect(function NotFoundErrorPage({ children }) {
    const navigationState = getNotFoundErrorPageState();
    if (!navigationState) return null;
    if (!isCurrentHistoryState(navigationState.historyState)) return null;

    return (
      <>
        <PageScroll navigationState={navigationState} />
        {children || (
          <div>
            <h1>The page you were looking for doesn't exist.</h1>
            <p>You may have mistyped the address or the page may have moved.</p>
          </div>
        )}
      </>
    );
  });

NotFoundErrorPage.displayName = 'Scrivito.NotFoundErrorPage';
