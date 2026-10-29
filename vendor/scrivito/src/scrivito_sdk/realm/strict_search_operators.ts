import { onReset } from 'scrivito_sdk/common';

let strictSearchOperators = false;

export function enableStrictSearchOperators(): void {
  strictSearchOperators = true;
}

export function areStrictSearchOperatorsEnabled(): boolean {
  return strictSearchOperators;
}

onReset(() => (strictSearchOperators = false));
