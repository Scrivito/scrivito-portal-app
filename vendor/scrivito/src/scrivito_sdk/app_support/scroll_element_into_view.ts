// @rewire
export function scrollElementIntoView(element: Element): void {
  // See https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView for details
  // * Chrome and Firefox support all options
  // * Safari supports the most important options: "block" and "inline" (tested with Safari 12.1.1)
  // * Edge: Unknown
  element.scrollIntoView({
    behavior: 'smooth',
    block: 'center',
    inline: 'center',
  });
}
