import {
  ArgumentError,
  ScrivitoError,
  checkArgumentsFor,
  tcomb as t,
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
): void;

/** @internal */
export function configureObjClassForContentType(
  configuration: ObjClassForContentTypeMapping,
  ...excessArgs: never[]
): void {
  checkConfigureObjClassForContentType(configuration, ...excessArgs);
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

const ContentTypePattern = t.refinement(
  t.String,
  // either */*, or
  // type/* (type without / and *), or
  // type/subtype (subtype without ; and *)
  // Note: Intentionally no */subtype
  (s) => /^(\*\/\*|[^\/\*]+\/(\*|[^\*;]+))$/.test(s),
  'Content Type'
);
const ConfigurationType = t.dict(ContentTypePattern, t.String);

const checkConfigureObjClassForContentType = checkArgumentsFor(
  'configureObjClassForContentType',
  [['configuration', ConfigurationType]],
  { docPermalink: 'js-sdk/configureObjClassForContentType' }
);
