export function handleRefAssignment(
  e: Element | null,
  ref: React.Ref<Element> | undefined
) {
  if (typeof ref === 'function') {
    ref(e);
  } else if (ref) {
    ref.current = e;
  }
}
