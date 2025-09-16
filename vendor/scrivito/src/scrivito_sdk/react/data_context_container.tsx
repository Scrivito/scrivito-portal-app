import * as React from 'react';

import { ArgumentError } from 'scrivito_sdk/common';
import {
  DataContext,
  DataItem,
  DataItemPojo,
  DataScope,
  DataStack,
  DataStackElement,
  PresentDataScopePojo,
  basicObjToDataContext,
  dataItemToDataContext,
  isMultiItemDataScopePojo,
  isSingleItemElement,
} from 'scrivito_sdk/data_integration';
import { BasicObj } from 'scrivito_sdk/models';
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

export function useDataStackOrThrow(): DataStack {
  const dataStack = React.useContext(DataStackReactContext)?.dataStack;

  if (!dataStack) {
    throw new ArgumentError(
      'Missing data context: Please use this hook inside a Scrivito application.'
    );
  }

  return dataStack;
}

export function useLastDataStackElement(): DataStackElement | undefined {
  const dataStack = React.useContext(DataStackReactContext)?.dataStack;
  return dataStack && dataStack.find((element) => !('isBackground' in element));
}

export function useClosestMultiItemElement(
  dataClassName?: string
): PresentDataScopePojo | undefined {
  return React.useContext(DataStackReactContext)?.dataStack?.find(
    (element): element is PresentDataScopePojo => {
      return (
        isMultiItemDataScopePojo(element) &&
        (dataClassName === undefined || element._class === dataClassName)
      );
    }
  );
}

export function useClosestSingleItemElement(
  dataClassName?: string
): DataItemPojo | PresentDataScopePojo | undefined {
  return React.useContext(DataStackReactContext)?.dataStack?.find(
    (element): element is DataItemPojo | PresentDataScopePojo => {
      return (
        isSingleItemElement(element) &&
        ((dataClassName === undefined && !('isBackground' in element)) ||
          element._class === dataClassName)
      );
    }
  );
}

export function PushOntoDataStack({
  data,
  children,
}: {
  data:
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
    if (data instanceof DataItem) {
      return {
        _class: data.dataClassName(),
        _id: data.id(),
      };
    }

    return data instanceof DataScope ? data.toPojo() : data;
  }
}

export function ProvidePlaceholders({
  source,
  isBackground,
  children,
}: {
  source: DataContext | DataItem | DataScope | Obj;
  children: React.ReactElement;
  isBackground?: true;
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
    const stackElement = _class &&
      _id && { _class, _id, ...(isBackground && { isBackground }) };

    return {
      dataStack: stackElement ? [stackElement, ...dataStack] : dataStack,
      placeholders,
    };
  }
}

function computePlaceholders(
  from: DataContext | DataItem | BasicObj
): DataContext {
  if (from instanceof DataItem) {
    return dataItemToDataContext(from);
  }

  if (from instanceof BasicObj) {
    return basicObjToDataContext(from);
  }

  return from;
}
