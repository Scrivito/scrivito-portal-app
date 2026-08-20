// @rewire
export function drawImgOnCanvas(img: HTMLImageElement): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.height = img.height;
  canvas.width = img.width;
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const ctx = canvas.getContext('2d')!;
  drawOnCanvasContext(img, ctx);
  return canvas;
}

// For test purpose only
export function drawOnCanvasContext(
  img: HTMLImageElement,
  ctx: CanvasRenderingContext2D,
): void {
  ctx.drawImage(img, 0, 0);
}
