import { onReset } from 'scrivito_sdk/common';
import { CropAspectRatio } from 'scrivito_sdk/ui_interface/app_adapter';

let cropAspectRatioConfig: CropAspectRatio[] | undefined;

/** @public */
export function configureCropAspectRatios(
  cropAspectRatios: CropAspectRatio[]
): void {
  cropAspectRatioConfig = [...cropAspectRatios];
}

export function getCropAspectRatios(): CropAspectRatio[] | undefined {
  return cropAspectRatioConfig;
}

onReset(() => {
  cropAspectRatioConfig = undefined;
});
