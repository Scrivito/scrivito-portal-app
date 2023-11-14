let strictSearchOperators = false;

export function enableStrictSearchOperators(): void {
  strictSearchOperators = true;
}

export function areStrictSearchOperatorsEnabled(): boolean {
  return strictSearchOperators;
}

// For test purposes only
export function resetStrictSearchOperators(): void {
  strictSearchOperators = false;
}
