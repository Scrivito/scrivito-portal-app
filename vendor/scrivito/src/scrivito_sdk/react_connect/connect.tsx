import * as React from 'react';

import {
  ArgumentError,
  InternalError,
  Streamable,
  Subscription,
} from 'scrivito_sdk/common';
import { runWithPerformanceConstraint } from 'scrivito_sdk/data';
import {
  CaptureReport,
  LoadingSubscriber,
  capture,
  isCurrentlyCapturing,
  runAndCatchErrorsWhileLoading,
} from 'scrivito_sdk/loadable';
import {
  ComponentType,
  SyncFunctionComponent,
} from 'scrivito_sdk/react/provide_component';
import { displayNameFromComponent } from 'scrivito_sdk/react_connect/display_name_from_component';
import { forwardElementTypeProps } from 'scrivito_sdk/react_connect/get_element_type';
import { useForceUpdate } from 'scrivito_sdk/react_connect/hooks/use_force_update';
import { isClassComponent } from 'scrivito_sdk/react_connect/is_class_component';
import { registerLoadingActivity } from 'scrivito_sdk/react_connect/loading_monitor';
import {
  StateAccessReport,
  StateSubscriber,
  createSyncSubscriber,
  trackStateAccess,
  withFrozenState,
  withUnfrozenState,
} from 'scrivito_sdk/state';

export interface ConnectOptions<LoadingProps> {
  loading?: ComponentType<LoadingProps>;
}

/** @public */
export function connect<Props extends LoadingProps, LoadingProps>(
  component: SyncFunctionComponent<Props>,
  options?: ConnectOptions<LoadingProps>
): SyncFunctionComponent<Props>;

/** @public */
export function connect<Props extends LoadingProps, LoadingProps>(
  component: React.ComponentClass<Props>,
  options?: ConnectOptions<LoadingProps>
): React.ComponentClass<Props>;

/** @public */
export function connect<Props extends LoadingProps, LoadingProps>(
  component: ComponentType<Props>,
  options?: ConnectOptions<LoadingProps>
): ComponentType<Props>;

/** @internal */
export function connect<
  Props extends LoadingProps,
  LoadingProps extends object
>(
  component: ComponentType<Props>,
  options?: ConnectOptions<LoadingProps>
): SyncFunctionComponent<Props> | React.ComponentClass<Props> {
  if (typeof component !== 'function') {
    throw new ArgumentError(
      'Scrivito.connect expects either a plain function or a subclass of React.Component'
    );
  }

  if (isConnectedComponent<Props>(component)) {
    return component;
  }

  return isClassComponent(component)
    ? connectClassComponent(component, options)
    : connectFunctionComponent(component, options);
}

interface ConnectedComponent {
  /** @internal */
  _isScrivitoConnectedComponent: boolean;
}

type ConnectedComponentClass<Props> = ConnectedComponent &
  React.ComponentClass<Props>;
type ConnectedFunctionComponent<Props> = ConnectedComponent &
  SyncFunctionComponent<Props>;

function connectClassComponent<
  Props extends LoadingProps,
  LoadingProps extends object
>(
  classComponent: React.ComponentClass<Props>,
  options?: ConnectOptions<LoadingProps>
): ConnectedComponentClass<Props> {
  const connectedComponent = class extends classComponent {
    static _isScrivitoConnectedComponent: boolean = true;

    private _scrivitoPrivateConnector: ComponentConnector;

    private _scrivitoRenderWhileLoading: React.ReactNode;

    constructor(props: Props) {
      super(props);

      const initialLoaderComponent = options?.loading;

      const _scrivitoRenderWhileLoading = initialLoaderComponent
        ? () => React.createElement(initialLoaderComponent, props)
        : this._scrivitoRenderWhileLoading;

      this._scrivitoPrivateConnector = new ComponentConnector(
        Object.assign(this, { _scrivitoRenderWhileLoading })
      );

      const { componentDidMount, componentWillUnmount } = this;

      const hasComponentDidMountBeenTampered =
        componentDidMount !== connectedComponent.prototype.componentDidMount;

      if (hasComponentDidMountBeenTampered) {
        this.componentDidMount = () => {
          connectedComponent.prototype.componentDidMount.call(this);
          componentDidMount.call(this);
        };
      }

      const hasComponentWillUnmountBeenTampered =
        componentWillUnmount !==
        connectedComponent.prototype.componentWillUnmount;

      if (hasComponentWillUnmountBeenTampered) {
        this.componentWillUnmount = () => {
          connectedComponent.prototype.componentWillUnmount.call(this);
          componentWillUnmount.call(this);
        };
      }
    }

    componentDidMount() {
      this._scrivitoPrivateConnector.componentDidMount();

      if (super.componentDidMount) {
        super.componentDidMount();
      }
    }

    componentWillUnmount() {
      this._scrivitoPrivateConnector.componentWillUnmount();

      if (super.componentWillUnmount) {
        super.componentWillUnmount();
      }
    }

    render() {
      return this._scrivitoPrivateConnector.render(() => super.render());
    }
  };

  connectedComponent.displayName = displayNameFromComponent(classComponent);

  return connectedComponent as ConnectedComponentClass<Props>;
}

function connectFunctionComponent<
  Props extends LoadingProps,
  LoadingProps extends object
>(
  functionalComponent: SyncFunctionComponent<Props>,
  options?: ConnectOptions<LoadingProps>
): ConnectedFunctionComponent<Props> {
  const initialLoaderComponent = options?.loading;

  const connectedComponent = (props: Props) =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useConnectedRender(
      () => functionalComponent(props),
      initialLoaderComponent
        ? () => React.createElement(initialLoaderComponent, props)
        : undefined
    );

  connectedComponent._isScrivitoConnectedComponent = true;
  connectedComponent.displayName =
    displayNameFromComponent(functionalComponent);

  return connectedComponent;
}

function useConnectedRender(
  originalRender: () => React.ReactNode,
  initialLoaderComponent?: () => React.ReactNode
): React.ReactElement {
  const forceUpdate = useForceUpdate();

  const connectorRef = React.useRef<ComponentConnector | undefined>(undefined);
  if (!connectorRef.current) {
    connectorRef.current = new ComponentConnector({
      forceUpdate,
      _scrivitoRenderWhileLoading: initialLoaderComponent,
    });
  }

  const connector = connectorRef.current;

  React.useEffect(() => {
    connector.componentDidMount();

    return () => connector.componentWillUnmount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return connector.render(originalRender);
}

function isConnectedComponent<Props>(
  component: ComponentType<Props>
): component is ConnectedComponentClass<Props> {
  return (
    (component as ConnectedComponentClass<Props>)
      ._isScrivitoConnectedComponent === true
  );
}

interface ConnectContext {
  hierarchyLevel: number;
  awakeness?: Streamable<boolean>;
}

export const ReactConnectContext = React.createContext<ConnectContext>({
  hierarchyLevel: 0,
});

type CapturedState = CaptureReport<StateAccessReport<unknown>>;

class ComponentConnector {
  private unregisterLoadingActivityCallback?: () => void;
  private lastRenderedState?: CapturedState;
  private readonly loadingSubscriber: LoadingSubscriber;
  private stateSubscriber?: StateSubscriber;
  private context?: ConnectContext;
  private childContext?: ConnectContext;
  private awakeSubscription?: Subscription;
  private wasComponentShown = false;

  constructor(private component: ConnectorComponentInferface) {
    this.loadingSubscriber = new LoadingSubscriber();
  }

  componentDidMount() {
    if (this.context === undefined) {
      throw new InternalError();
    }

    this.stateSubscriber = createSyncSubscriber(
      () => withUnfrozenState(() => this.component.forceUpdate()),
      this.context.hierarchyLevel
    );

    this.awakeSubscription = this.context.awakeness?.subscribe((awake) =>
      this.stateSubscriber?.setAwake(awake)
    );

    if (this.lastRenderedState) this.subscribeState(this.lastRenderedState);
  }

  componentWillUnmount() {
    this.awakeSubscription?.unsubscribe();
    this.unsubscribeState();
    this.stateSubscriber = undefined;
  }

  render(originalRender: () => React.ReactNode) {
    const reactElement = this.renderLoadingAware(originalRender);

    return (
      <ReactConnectContext.Consumer {...forwardElementTypeProps(reactElement)}>
        {(context) => (
          <ReactConnectContext.Provider
            value={this.grabAndProvideChildContext(context)}
          >
            {reactElement}
          </ReactConnectContext.Provider>
        )}
      </ReactConnectContext.Consumer>
    );
  }

  /* grab connect context as a side-effect of rendering.
   * ugly, but doing this nicer is only possible in a hook-only way
   * and Scrivito.connect needs to support class components also.
   */
  private grabAndProvideChildContext(context: ConnectContext) {
    this.context = context;

    // avoid creating a new context object on each render
    this.childContext ||= {
      ...context,

      hierarchyLevel: context.hierarchyLevel + 1,
    };

    return this.childContext;
  }

  private renderLoadingAware(originalRender: () => React.ReactNode) {
    if (isCurrentlyCapturing()) {
      // we are inside a capture - no need to load anything ourselves
      // (this usually means the caller is prerendering, e.g. renderToString)
      return runWithFrozenState(originalRender);
    }

    const captured = capture(() =>
      trackStateAccess(() =>
        runWithPerformanceConstraint(() => runWithFrozenState(originalRender))
      )
    );

    this.lastRenderedState = captured;
    this.subscribeState(captured);

    const { result } = captured.result;

    if (captured.isAllDataLoaded()) {
      this.wasComponentShown = true;

      return result;
    }

    return this.handleLoading(result);
  }

  private subscribeState(captured: CapturedState) {
    // if there's no stateSubscriber then the component isn't mounted
    // and thus doesn't need a subscription for state changes.
    if (!this.stateSubscriber) return;

    this.stateSubscriber.subscribeChanges(captured.result.accessedState);
    captured.subscribeLoading(this.loadingSubscriber);

    if (captured.isAllDataLoaded()) this.unregisterLoadingActivity();
    else this.registerLoadingActivity();
  }

  private unsubscribeState() {
    if (this.stateSubscriber) this.stateSubscriber.unsubscribe();
    this.unregisterLoadingActivity();
    this.loadingSubscriber.unsubscribe();
  }

  private handleLoading(preliminaryResult: React.ReactNode) {
    if (this.component._scrivitoRenderWhileLoading && !this.wasComponentShown) {
      return this.component._scrivitoRenderWhileLoading();
    }

    return preliminaryResult;
  }

  private registerLoadingActivity() {
    if (!this.unregisterLoadingActivityCallback) {
      this.unregisterLoadingActivityCallback = registerLoadingActivity();
    }
  }

  private unregisterLoadingActivity() {
    const unregister = this.unregisterLoadingActivityCallback;
    if (unregister) {
      delete this.unregisterLoadingActivityCallback;
      unregister();
    }
  }
}

interface ConnectorComponentInferface {
  forceUpdate(): void;
  _scrivitoRenderWhileLoading?: () => React.ReactNode;
}

function runWithFrozenState(
  originalRender: () => React.ReactNode
): React.ReactNode {
  const run = runAndCatchErrorsWhileLoading(() =>
    withFrozenState(
      {
        contextName: 'React.Component#render',
        message: 'Use one of the React lifecycle hooks.',
      },
      originalRender
    )
  );

  return run.success ? run.result : null;
}
