export function getChildPath(parentPath: string, childName: string) {
  return parentPath === '/' ? `/${childName}` : `${parentPath}/${childName}`;
}
