export function computeParentPath(path?: string | null): string | null {
  if (!path || path === '/') return null;
  return path.split('/').slice(0, -1).join('/') || '/';
}
