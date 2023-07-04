export function computeAncestorPaths(path: string): string[] {
  const ancestorPaths = ['/'];
  if (path === '/') return ancestorPaths;

  const components = path.split('/').slice(1);
  let ancestorPath = '';

  components.forEach((component) => {
    ancestorPath = `${ancestorPath}/${component}`;
    ancestorPaths.push(ancestorPath);
  });

  return ancestorPaths;
}
