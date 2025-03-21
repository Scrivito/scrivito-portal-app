import {
  ArgumentError,
  QueryParameters,
  throwNextTick,
} from 'scrivito_sdk/common';
import { getComponentForAppClass } from 'scrivito_sdk/react/component_registry';

import { AttributeDefinitions, Obj } from 'scrivito_sdk/realm';

/** @public */
export interface PageComponentProps<
  AttrDefs extends AttributeDefinitions = AttributeDefinitions
> {
  page: Obj<AttrDefs>;
  params?: QueryParameters;
}

export function getComponentForPageClass(
  pageClassName: string
): React.ComponentType<PageComponentProps> | undefined {
  const pageComponent = getComponentForAppClass(pageClassName);

  if (pageComponent) {
    return pageComponent as React.ComponentType<PageComponentProps>;
  }

  throwNextTick(
    new ArgumentError(
      `No component registered for obj class "${pageClassName}"`
    )
  );
}
