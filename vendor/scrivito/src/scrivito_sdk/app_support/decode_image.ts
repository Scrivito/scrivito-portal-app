// @rewire
import { decodeOrLoadImg, hasDecodeImg } from './decode/decode_or_load_img';
import { drawImgOnCanvas } from './decode/draw_img_on_canvas';

export function decodeImage(imageUrl: string): Promise<string> {
  return decodeOrLoadImg(imageUrl)
    .then((img) => {
      if (!hasDecodeImg(img)) drawImgOnCanvas(img);
      return imageUrl;
    })
    .catch(() => imageUrl);
}
