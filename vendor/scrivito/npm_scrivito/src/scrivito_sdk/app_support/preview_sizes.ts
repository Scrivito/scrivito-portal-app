import { ArgumentError, isValidInteger } from 'scrivito_sdk/common';
import { createStateContainer } from 'scrivito_sdk/state';
import { PreviewSize } from 'scrivito_sdk/ui_interface/app_adapter';

const state = createStateContainer<PreviewSize[]>();

interface PreviewSizeInput {
  title: string;
  width?: number | null;
  description?: string;
  icon?: string;
}

/** @public */
export function configurePreviewSizes(previewSizes: PreviewSizeInput[]): void {
  if (!previewSizes.length) {
    throw new ArgumentError(
      'No sizes has been provided for "configurePreviewSizes"',
    );
  }

  if (
    !previewSizes.every(
      (size) => typeof size.title === 'string' && size.title.length > 0,
    )
  ) {
    throw new ArgumentError('Each preview size must have a non-empty title');
  }

  const numericWidths = previewSizes
    .map(({ width }) => width)
    .filter((width) => typeof width === 'number');

  if (new Set(numericWidths).size !== numericWidths.length) {
    throw new ArgumentError('A "width" must be unique for sizes');
  }

  if (!previewSizes.every(validatePreviewSizeWidth)) {
    throw new ArgumentError('A "width" must be a positive integer');
  }

  const normalizedPreviewSizes = previewSizes.map(normalizePreviewSize);
  state.set(normalizedPreviewSizes);
}

function validatePreviewSizeWidth(previewSize: PreviewSizeInput) {
  const width = previewSize?.width;
  if (width === null || width === undefined) return true;

  return isValidInteger(width) && width > 0;
}

export function getPreviewSizes(): PreviewSize[] | undefined {
  return state.get();
}

function normalizePreviewSize(input: PreviewSizeInput): PreviewSize {
  return input.width === null
    ? { ...input, width: undefined }
    : (input as PreviewSize);
}
