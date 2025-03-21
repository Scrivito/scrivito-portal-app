import { ContextContainer, InternalError } from 'scrivito_sdk/common';

const constraint = new ContextContainer<boolean>();

export function failIfPerformanceConstraint(message: string): void {
  if (constraint.current()) throw new InternalError(message);
}

export function runWithPerformanceConstraint<T>(fn: () => T): T {
  return constraint.runWith(true, fn);
}
