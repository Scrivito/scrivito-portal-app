export function joinPaths(startPath: string, endPath: string): string {
  if (endPath === '') return startPath;
  return `${startPath}/${endPath.replace(/^\//, '')}`;
}
