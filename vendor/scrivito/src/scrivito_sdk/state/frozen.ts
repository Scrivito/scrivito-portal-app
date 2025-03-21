import { ContextContainer, ScrivitoError } from 'scrivito_sdk/common';

export interface FrozenContext {
  contextName: string;
  message?: string;
}

const frozenContextContainer = new ContextContainer<
  FrozenContext | undefined
>();

export function withFrozenState<T>(
  frozenContext: FrozenContext,
  fn: () => T
): T {
  return frozenContextContainer.runWith(frozenContext, fn);
}

export function withUnfrozenState<T>(fn: () => T): T {
  return frozenContextContainer.runWith(undefined, fn);
}

export function failIfFrozen(operationName: string): void {
  const frozenContext = frozenContextContainer.current();

  if (frozenContext) {
    throw new StateChangePreventedError(frozenContext, operationName);
  }
}

export class StateChangePreventedError extends ScrivitoError {
  constructor(
    readonly frozenContext: FrozenContext,
    readonly operationName: string
  ) {
    super(
      `${operationName} is not permitted ` +
        `inside '${frozenContext.contextName}'. ` +
        (frozenContext.message || '')
    );
  }
}
