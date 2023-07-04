import * as React from 'react';

import {
  DataContext,
  DataItem,
  DataScope,
  DataStack,
  DataStackElement,
  toDataContext,
} from 'scrivito_sdk/data_integration';
import { Obj, unwrapAppClass } from 'scrivito_sdk/realm';

export interface DataContextContainer {
  dataContext: DataContext;
  dataStack: DataStack;
}

const DataStackReactContext = React.createContext<
  DataContextContainer | undefined
>(undefined);

export function useDataContextContainer(): DataContextContainer | undefined {
  return React.useContext(DataStackReactContext);
}

export function useDataContext(): DataContext | undefined {
  return React.useContext(DataStackReactContext)?.dataContext;
}

export function useDataStack(): DataStack | undefined {
  return React.useContext(DataStackReactContext)?.dataStack;
}

export function useLastDataStackElement(): DataStackElement | undefined {
  const dataStack = React.useContext(DataStackReactContext)?.dataStack;
  return dataStack && dataStack[0];
}

export function PushOntoDataStack({
  item,
  children,
}: {
  item: DataContext | DataItem | DataScope | Obj;
  children: React.ReactElement;
}) {
  const prevDataStack =
    React.useContext(DataStackReactContext)?.dataStack || [];

  return (
    <DataStackReactContext.Provider
      value={computeContextValue(item, prevDataStack)}
      children={children}
    />
  );
}

function computeContextValue(
  givenDataContext: DataContext | DataItem | DataScope | Obj,
  prevDataStack: DataStack
) {
  if (givenDataContext instanceof DataScope) {
    return {
      dataContext: {},
      dataStack: [givenDataContext.toPojo(), ...prevDataStack],
    };
  }

  const dataContext = toDataContext(unwrapAppClass(givenDataContext));

  const { _class, _id } = dataContext;

  const dataStack =
    _class && _id ? [{ _class, _id }, ...prevDataStack] : prevDataStack;

  return { dataStack, dataContext };
}
