import uniqBy from 'lodash-es/uniqBy';

import { ArgumentError, isValidInteger } from 'scrivito_sdk/common';
import { createStateContainer } from 'scrivito_sdk/state';
import { PreviewSize } from 'scrivito_sdk/ui_interface/app_adapter';

const state = createStateContainer<PreviewSize[]>();

/** @public */
export function configurePreviewSizes(previewSizes: PreviewSize[]): void {
  if (!previewSizes.length) {
    throw new ArgumentError(
      'No sizes has been provided for "configurePreviewSizes"'
    );
  }

  if (uniqBy(previewSizes, 'width').length !== previewSizes.length) {
    throw new ArgumentError('A "width" must be unique for sizes');
  }

  if (!previewSizes.every(validatePreviewSizeWidth)) {
    throw new ArgumentError('A "width" must be a positive integer');
  }

  state.set(previewSizes);
}

function validatePreviewSizeWidth(previewSize: PreviewSize) {
  const width = previewSize?.width;
  if (!width) return true;

  return isValidInteger(width) && width > 0;
}

export function getPreviewSizes(): PreviewSize[] | undefined {
  return state.get();
}
