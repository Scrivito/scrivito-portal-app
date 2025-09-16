import * as React from 'react';

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
  const data = content.get('data', 'datalocator');
  const dataScope = useDataLocator(data);

  if (data.class() === null) return children;

  return <PushOntoDataStack data={dataScope}>{children}</PushOntoDataStack>;
});
