import { InternalError } from 'scrivito_sdk/common';

type HasComponentHandler = (name: string) => boolean;

let hasComponentHandler: HasComponentHandler | undefined;

export function hasComponent(name: string): boolean {
  if (!hasComponentHandler) {
    throw new InternalError();
  }

  return hasComponentHandler(name);
}

export function setHasComponentHandler(func: HasComponentHandler) {
  hasComponentHandler = func;
}
