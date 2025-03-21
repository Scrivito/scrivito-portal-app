export function childNodeListToArray(
  childNodes: NodeListOf<ChildNode>
): ChildNode[] {
  // See 8083b344e7f006604201d470e01674b5e18e3ca5 for a link to an explanation.
  return Array.prototype.slice.call(childNodes);
}
