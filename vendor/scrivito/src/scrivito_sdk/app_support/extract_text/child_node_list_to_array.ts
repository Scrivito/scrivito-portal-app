export function childNodeListToArray(
  childNodes: NodeListOf<ChildNode>
): ChildNode[] {
  // See https://stackoverflow.com/a/24775765/881759 for options
  return Array.prototype.slice.call(childNodes);
}
