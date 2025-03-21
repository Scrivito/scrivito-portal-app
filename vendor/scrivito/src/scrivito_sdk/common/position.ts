export interface Position {
  readonly x: number;
  readonly y: number;
}

export function clickPositionWithinElement<T extends HTMLElement>(
  clickEvent: React.MouseEvent<T>,
  element: T
): Position {
  const { clientX: mouseX, clientY: mouseY } = clickEvent;
  const { left: elementX, top: elementY } = element.getBoundingClientRect();

  return {
    x: mouseX - elementX,
    y: mouseY - elementY,
  };
}
