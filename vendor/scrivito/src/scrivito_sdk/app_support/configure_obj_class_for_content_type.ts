import {
  ArgumentError,
  ScrivitoError,
  throwInvalidArgumentsError,
} from 'scrivito_sdk/common';
import { createStateContainer } from 'scrivito_sdk/state';
import { ObjClassForContentTypeMapping } from 'scrivito_sdk/ui_interface/app_adapter';

const state = createStateContainer<ObjClassForContentTypeMapping>();

export function getObjClassForContentTypeMapping():
  | ObjClassForContentTypeMapping
  | undefined {
  return state.get();
}

/** @public */
export function configureObjClassForContentType(
  configuration: ObjClassForContentTypeMapping
): void {
  checkConfigureObjClassForContentType(configuration);

  if (!configuration['*/*']) {
    throw new ArgumentError(
      'No ObjClass has been configured for the contentType "*/*"'
    );
  }
  if (state.get() !== undefined) {
    throw new ScrivitoError(
      'configureObjClassForContentType must be called only once'
    );
  }

  state.set(configuration);
}

function checkConfigureObjClassForContentType(
  configuration: ObjClassForContentTypeMapping
) {
  Object.keys(configuration).forEach((contentType) => {
    if (!/^(\*\/\*|[^\/\*]+\/(\*|[^\*;]+))$/.test(contentType)) {
      throwInvalidArgumentsError(
        'configureObjClassForContentType',
        `Content type '${contentType}' is not valid.`,
        { docPermalink: 'js-sdk/configureObjClassForContentType' }
      );
    }
  });
}
