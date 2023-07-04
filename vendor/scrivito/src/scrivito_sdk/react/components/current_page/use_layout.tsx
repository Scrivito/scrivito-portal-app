import * as React from 'react';

import { QueryParameters, computeAncestorPaths } from 'scrivito_sdk/common';
import { loadWithDefault } from 'scrivito_sdk/loadable';
import {
  BasicObj,
  currentObjSpaceId,
  getObjBy,
  objSpaceScope,
} from 'scrivito_sdk/models';
import {
  areLayoutComponentsStored,
  getLayoutComponentForAppClass,
} from 'scrivito_sdk/react/component_registry';
import { CurrentPage } from 'scrivito_sdk/react/components/current_page';
import { connect } from 'scrivito_sdk/react/connect';
import { wrapInAppClass } from 'scrivito_sdk/realm';

import { DetailsPageDataContext } from './details_page_data_context';

const LayoutIndexContext = React.createContext(0);

export function useLayout(
  page: BasicObj,
  params: QueryParameters
): React.ReactElement | 'loading' | undefined {
  const layoutIndex = React.useContext(LayoutIndexContext);
  if (!areLayoutComponentsStored()) return;

  // preload ancestors, to avoid loading them one-by-one.
  if (layoutIndex === 0) page.ancestors();

  const nextPage = getNextPage(page, layoutIndex);

  if (nextPage === undefined) return;
  if (nextPage === 'loading') return 'loading';

  return (
    <PageLayout page={nextPage} params={params} layoutIndex={layoutIndex} />
  );
}

function getNextPage(page: BasicObj, layoutIndex: number) {
  const path = page.path();

  if (path) {
    const ancestorPaths = computeAncestorPaths(path);
    if (layoutIndex >= ancestorPaths.length) return;

    const ancestorPath = ancestorPaths[layoutIndex];
    return ancestorPath === path ? page : objByPath(ancestorPath);
  }

  if (layoutIndex === 0) return page;
}

function objByPath(path: string) {
  return loadWithDefault('loading', () =>
    getObjBy(objSpaceScope(currentObjSpaceId()), '_path', path)
  );
}

const PageLayout = connect(function PageLayout({
  page,
  params,
  layoutIndex,
}: {
  page: BasicObj | null;
  params: QueryParameters;
  layoutIndex: number;
}) {
  const Component = page && getLayoutComponentForAppClass(page.objClass());

  return (
    <DetailsPageDataContext page={page} params={params}>
      <LayoutIndexContext.Provider value={layoutIndex + 1}>
        {Component ? (
          <Component page={wrapInAppClass(page)} />
        ) : (
          <CurrentPage />
        )}
      </LayoutIndexContext.Provider>
    </DetailsPageDataContext>
  );
});
