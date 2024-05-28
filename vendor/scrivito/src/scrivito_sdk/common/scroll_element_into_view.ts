// @rewire
// For test purpose only
export function scrollElementIntoView(
  element: Element,
  options: ScrollIntoViewOptions
): void {
  element.scrollIntoView(options);
}
