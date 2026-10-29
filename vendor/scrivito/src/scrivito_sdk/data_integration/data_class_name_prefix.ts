import { onReset } from 'scrivito_sdk/common';

const NAMED_PREFIX = 'named/';
const ANON_PREFIX = 'anon/';

let anonCounter = 0;

export function addDataClassPrefix(name: string | null): string {
  if (name === null) {
    anonCounter++;
    return `${ANON_PREFIX}${anonCounter}`;
  }

  if (name.startsWith(NAMED_PREFIX) || name.startsWith(ANON_PREFIX)) {
    return name;
  }

  return `${NAMED_PREFIX}${name}`;
}

export function removeDataClassPrefix(name: string): string | null {
  if (name.startsWith(ANON_PREFIX)) return null;
  if (name.startsWith(NAMED_PREFIX)) return name.slice(NAMED_PREFIX.length);
  return name;
}

onReset(() => (anonCounter = 0));
