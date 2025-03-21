import * as React from 'react';

import { basicObjToDataContext } from 'scrivito_sdk/data_integration';
import { BasicObj } from 'scrivito_sdk/models';
import { ProvidePlaceholders } from 'scrivito_sdk/react/data_context_container';
import { connect } from 'scrivito_sdk/react_connect';

export const PageDataContext = connect(function PageDataContext({
  page,
  children,
}: {
  page: BasicObj | null;
  children: React.ReactElement;
}) {
  if (!page) return children;

  return (
    <ProvidePlaceholders
      source={basicObjToDataContext(page)}
      isBackground={true}
    >
      {children}
    </ProvidePlaceholders>
  );
});
