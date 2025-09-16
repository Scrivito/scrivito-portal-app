// @rewire
import { decodeOrLoadImg, hasDecodeImg } from './decode/decode_or_load_img';
import { drawImgOnCanvas } from './decode/draw_img_on_canvas';

export async function decodeImage(imageUrl: string): Promise<string> {
  try {
    const img = await decodeOrLoadImg(imageUrl);
    if (!hasDecodeImg(img)) drawImgOnCanvas(img);
    return imageUrl;
  } catch {
    return imageUrl;
  }
}
