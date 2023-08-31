import * as React from 'react';

import { QueryParameters } from 'scrivito_sdk/common';
import { dataContextFromQueryParams } from 'scrivito_sdk/data_integration';
import { BasicObj } from 'scrivito_sdk/models';
import { connect } from 'scrivito_sdk/react';
import { getDataErrorComponent } from 'scrivito_sdk/react/component_registry';
import { PushOntoDataStack } from 'scrivito_sdk/react/data_context_container';

export const DetailsPageDataContext = connect(function DetailsPageDataContext({
  page,
  params,
  children,
}: {
  page: BasicObj | null;
  params: QueryParameters;
  children: React.ReactElement;
}) {
  if (!page) return children;

  const dataContext = dataContextFromQueryParams(page, params);

  if (dataContext === 'loading') return null;
  if (dataContext === 'unavailable') return renderDataError();

  if (!dataContext) return children;

  return <PushOntoDataStack item={dataContext}>{children}</PushOntoDataStack>;
});

function renderDataError() {
  const DataErrorComponent = getDataErrorComponent();
  return DataErrorComponent ? <DataErrorComponent /> : <>Data Not Found</>;
}
