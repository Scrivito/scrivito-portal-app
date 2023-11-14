import * as React from 'react';

import {
  DataContext,
  DataItem,
  DataScope,
  DataStack,
  DataStackElement,
  computePlaceholders,
} from 'scrivito_sdk/data_integration';
import { Obj, unwrapAppClass } from 'scrivito_sdk/realm';

export interface DataContextContainer {
  placeholders: DataContext;
  dataStack: DataStack;
}

const DataStackReactContext = React.createContext<
  DataContextContainer | undefined
>(undefined);

export function useDataContextContainer(): DataContextContainer | undefined {
  return React.useContext(DataStackReactContext);
}

export function usePlaceholders(): DataContext | undefined {
  return React.useContext(DataStackReactContext)?.placeholders;
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
  item:
    | DataItem
    | DataScope
    // Shortcut for tests only
    | DataStackElement;
  children: React.ReactElement;
}) {
  const dataStack = React.useContext(DataStackReactContext)?.dataStack || [];
  const stackElement = computeStackElement();

  return (
    <DataStackReactContext.Provider
      value={{ dataStack: [stackElement, ...dataStack], placeholders: {} }}
      children={children}
    />
  );

  function computeStackElement() {
    if (item instanceof DataItem) {
      return {
        _class: item.dataClass().name(),
        _id: item.id(),
      };
    }

    return item instanceof DataScope ? item.toPojo() : item;
  }
}

export function ProvidePlaceholders({
  source,
  children,
}: {
  source: DataContext | DataItem | DataScope | Obj;
  children: React.ReactElement;
}) {
  const dataStack = React.useContext(DataStackReactContext)?.dataStack || [];

  return (
    <DataStackReactContext.Provider
      value={computeValue()}
      children={children}
    />
  );

  function computeValue() {
    if (source instanceof DataScope) {
      return {
        dataStack: [source.toPojo(), ...dataStack],
        placeholders: {},
      };
    }

    const placeholders = computePlaceholders(unwrapAppClass(source));

    const { _class, _id } = placeholders;
    const stackElement = _class && _id && { _class, _id };

    return {
      dataStack: stackElement ? [stackElement, ...dataStack] : dataStack,
      placeholders,
    };
  }
}
