import * as React from 'react';

import { connect } from 'scrivito_sdk/react_connect';

export function createConnectedContext<T>(value: T): ConnectedContext<T> {
  const { Provider, Consumer } = React.createContext(value);

  return {
    Provider,
    Consumer: connectContextConsumer(Consumer),
  };
}

type Callback<T> = (value: T) => React.ReactElement<unknown> | null;

export interface ConnectedContext<T> {
  Provider: React.Provider<T>;
  Consumer: React.FunctionComponent<ConsumerProps<T>>;
}

export interface ConsumerProps<T> {
  children: Callback<T>;
}

interface ConnectedCallbackProps<T> {
  callback: Callback<T>;
  value: T;
}

function connectContextConsumer<T>(
  Consumer: React.Consumer<T>
): React.FunctionComponent<ConsumerProps<T>> {
  const ConnectedCallback = connect(
    ({ callback, value }: ConnectedCallbackProps<T>) => callback(value)
  );

  return ({ children }: ConsumerProps<T>) => (
    <Consumer>
      {(value) => <ConnectedCallback callback={children} value={value} />}
    </Consumer>
  );
}
