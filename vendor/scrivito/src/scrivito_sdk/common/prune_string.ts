const SPACES_REGEX = /\s+/g;
const ONE_SPACE = ' ';

export function pruneString(input: string): string {
  return input.trim().replace(SPACES_REGEX, ONE_SPACE);
}
