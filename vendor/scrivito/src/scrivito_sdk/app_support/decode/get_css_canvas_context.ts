// @rewire
// currently only supported in safari
export function getCSSCanvasContext(
  contextType: '2d',
  identifier: string,
  width: number,
  height: number
): CanvasRenderingContext2D {
  if (!documentGetCSSCanvasContext()) {
    throw new Error('Browser does not support getCSSCanvasContext!');
  }

  return documentGetCSSCanvasContext()(contextType, identifier, width, height);
}

export function clearGetCSSCanvasContext(identifier: string): void {
  getCSSCanvasContext('2d', identifier, 0, 0);
}

export function hasGetCSSCanvasContext(): boolean {
  return !!documentGetCSSCanvasContext();
}

// For test purpose only
export function documentGetCSSCanvasContext() {
  return (
    (document as DocumentWithGetCSSCanvasContext).getCSSCanvasContext &&
    (document as DocumentWithGetCSSCanvasContext).getCSSCanvasContext.bind(
      document
    )
  );
}

interface DocumentWithGetCSSCanvasContext extends Document {
  getCSSCanvasContext(
    contextType: '2d',
    identifier: string,
    width: number,
    height: number
  ): CanvasRenderingContext2D;
}
