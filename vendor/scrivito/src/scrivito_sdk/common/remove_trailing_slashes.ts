export function removeTrailingSlashes(input: string): string {
  return input.replace(/([^/]|^)\/+$/, '$1');
}
