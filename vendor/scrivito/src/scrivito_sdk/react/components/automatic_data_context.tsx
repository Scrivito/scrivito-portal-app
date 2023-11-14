import * as React from 'react';

import { EmptyDataScope } from 'scrivito_sdk/data_integration';
import { BasicObj, BasicWidget } from 'scrivito_sdk/models';
import { PushOntoDataStack } from 'scrivito_sdk/react/data_context_container';
import { useDataLocator } from 'scrivito_sdk/react/hooks/use_data_locator';
import { connect } from 'scrivito_sdk/react_connect';

export const AutomaticDataContext = connect(function AutomaticDataContext({
  content,
  children,
}: {
  content: BasicObj | BasicWidget;
  children: React.ReactElement;
}) {
  const dataScope = useDataLocator(content.get('data', 'datalocator'));
  if (dataScope instanceof EmptyDataScope) return children;

  return <PushOntoDataStack item={dataScope}>{children}</PushOntoDataStack>;
});
