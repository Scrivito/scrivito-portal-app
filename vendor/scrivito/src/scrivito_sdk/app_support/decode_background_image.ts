// @rewire
import {
  drawImgOnCanvas,
  drawOnCanvasContext,
} from 'scrivito_sdk/app_support/decode/draw_img_on_canvas';
import {
  clearGetCSSCanvasContext,
  getCSSCanvasContext,
  hasGetCSSCanvasContext,
} from 'scrivito_sdk/app_support/decode/get_css_canvas_context';
import { decodeOrLoadImg, hasDecodeImg } from './decode/decode_or_load_img';

export interface DecodedBackgroundImage {
  decodedBackgroundUrl: string;
  clear?: () => void;
}

export async function decodeBackgroundImage(
  imageUrl: string
): Promise<DecodedBackgroundImage> {
  try {
    const img = await decodeOrLoadImg(imageUrl);
    if (hasGetCSSCanvasContext()) return webkitCanvas(img);
    if (!hasDecodeImg(img)) return drawCanvas(img);
    return { decodedBackgroundUrl: `url(${imageUrl})` };
  } catch {
    return { decodedBackgroundUrl: `url(${imageUrl})` };
  }
}

function webkitCanvas(img: HTMLImageElement): DecodedBackgroundImage {
  const webkitCanvasIdentifier = `ScrivitoBackgroundImage${nextCounter()}`;
  const ctx = getCSSCanvasContext(
    '2d',
    webkitCanvasIdentifier,
    img.width,
    img.height
  );
  drawOnCanvasContext(img, ctx);
  return {
    decodedBackgroundUrl: `-webkit-canvas(${webkitCanvasIdentifier})`,
    clear: () => clearGetCSSCanvasContext(webkitCanvasIdentifier),
  };
}

function drawCanvas(img: HTMLImageElement): DecodedBackgroundImage {
  drawImgOnCanvas(img);
  return { decodedBackgroundUrl: `url(${img.src})` };
}

let counter: number = 0;

function nextCounter(): number {
  counter += 1;
  return counter;
}

// For test purpose only
export function resetCounter(): void {
  counter = 0;
}
