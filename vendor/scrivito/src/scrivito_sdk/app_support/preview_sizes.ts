import { uniq } from 'underscore';

import {
  ArgumentError,
  checkArgumentsFor,
  tcomb as t,
} from 'scrivito_sdk/common';
import { createStateContainer } from 'scrivito_sdk/state';
import { PreviewSize } from 'scrivito_sdk/ui_interface/app_adapter';

const state = createStateContainer<PreviewSize[]>();

/** @public */
export function configurePreviewSizes(previewSizes: PreviewSize[]): void {
  checkConfigurePreviewSizes(previewSizes);

  if (!previewSizes.length) {
    throw new ArgumentError(
      'No sizes has been provided for "configurePreviewSizes"'
    );
  }

  if (uniq(previewSizes, 'width').length !== previewSizes.length) {
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

  return width % 1 === 0 && width > 0;
}

export function getPreviewSizes(): PreviewSize[] | undefined {
  return state.get();
}

const PreviewSizeType = t.interface(
  {
    title: t.String,
    width: t.maybe(t.Number),
    description: t.maybe(t.String),
    icon: t.maybe(t.String),
  },
  'PreviewSize'
);

const checkConfigurePreviewSizes = checkArgumentsFor(
  'configurePreviewSizes',
  [['previewSizes', t.list(PreviewSizeType)]],
  { docPermalink: 'js-sdk/configurePreviewSizes' }
);
