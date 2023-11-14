// @rewire
import { ScrivitoPromise } from 'scrivito_sdk/common';

export function decodeOrLoadImg(imageUrl: string): Promise<HTMLImageElement> {
  const img = new Image();
  return hasDecodeImg(img) ? decodeImg(img, imageUrl) : loadImg(img, imageUrl);
}

export function hasDecodeImg(img: HTMLImageElement): boolean {
  return !!img.decode;
}

// For test purpose only
export function decodeImg(
  img: HTMLImageElement,
  imageUrl: string
): Promise<HTMLImageElement> {
  if (!hasDecodeImg(img)) {
    throw new Error('Browser does not support decode!');
  }

  img.src = imageUrl;
  return imgDecode(img)().then(() => img);
}

// For test purpose only
export function imgDecode(img: HTMLImageElement) {
  return img.decode && img.decode.bind(img);
}

// For test purpose only
export function loadImg(
  img: HTMLImageElement,
  imageUrl: string
): Promise<HTMLImageElement> {
  return new ScrivitoPromise((resolve, reject) => {
    img.onload = () => resolve(img);
    img.onerror = (event) => reject(event);
    img.src = imageUrl;
  });
}
