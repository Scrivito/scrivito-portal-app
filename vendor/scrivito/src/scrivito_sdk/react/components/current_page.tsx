import * as React from 'react';
import * as URI from 'urijs';

import { getCurrentPageData } from 'scrivito_sdk/app_support/current_page_data';
import { NavigationState } from 'scrivito_sdk/app_support/navigation_state';
import { BasicObj } from 'scrivito_sdk/models';
import { AutomaticDataContext } from 'scrivito_sdk/react/components/automatic_data_context';
import { CurrentEditableArea } from 'scrivito_sdk/react/components/current_editable_area';
import { PageScroll } from 'scrivito_sdk/react/components/page_scroll';
import { getComponentForPageClass } from 'scrivito_sdk/react/get_component_for_page_class';
import { connect } from 'scrivito_sdk/react_connect';
import { wrapInAppClass } from 'scrivito_sdk/realm';

import { DetailsPageDataContext } from './current_page/details_page_data_context';
import { PageDataContext } from './current_page/page_data_context';
import { useLayout } from './current_page/use_layout';

/** @public */
export const CurrentPage: React.ComponentType<unknown> = connect(
  function CurrentPage() {
    const pageData = getCurrentPageData();
    if (!pageData) return null;

    const { currentPage, navigationState } = pageData;
    if (!currentPage) return null;

    return (
      <CurrentPageWithLayout
        currentPage={currentPage}
        navigationState={navigationState}
      />
    );
  }
);

const CurrentPageWithLayout = connect(function CurrentPageWithLayout({
  currentPage,
  navigationState,
}: {
  currentPage: BasicObj;
  navigationState: NavigationState;
}) {
  const params = URI.parseQuery(navigationState?.locationRoute?.query ?? '');

  const layout = useLayout(currentPage, params);
  if (layout) return layout === 'loading' ? null : layout;

  const PageComponent = getComponentForPageClass(currentPage.objClass());

  return (
    <PageDataContext page={currentPage}>
      <DetailsPageDataContext page={currentPage} params={params}>
        <AutomaticDataContext content={currentPage}>
          <CurrentEditableArea value="currentPage">
            <PageScroll navigationState={navigationState} />
            {PageComponent && (
              <PageComponent
                page={wrapInAppClass(currentPage)}
                params={params}
              />
            )}
          </CurrentEditableArea>
        </AutomaticDataContext>
      </DetailsPageDataContext>
    </PageDataContext>
  );
});

CurrentPage.displayName = 'Scrivito.CurrentPage';
