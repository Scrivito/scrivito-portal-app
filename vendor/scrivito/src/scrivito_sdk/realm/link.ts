import difference from 'lodash-es/difference';
import isEmpty from 'lodash-es/isEmpty';

import {
  ArgumentError,
  QueryParameters,
  prettyPrint,
} from 'scrivito_sdk/common';
import { BasicLink, BasicLinkAttributes, BasicObj } from 'scrivito_sdk/models';
import { Obj } from 'scrivito_sdk/realm';
import {
  unwrapAppClass,
  wrapInAppClass,
} from 'scrivito_sdk/realm/wrap_in_app_class';

export interface LinkAttributes {
  hash?: string;
  obj?: Obj | null;
  query?: string;
  rel?: string;
  target?: string;
  title?: string;
  url?: string;
}

/** @public */
export class Link {
  /** @internal */
  readonly _scrivitoPrivateContent: BasicLink;

  constructor(attributes: LinkAttributes) {
    const basicAttributes = toBasicAttributes(attributes);
    this._scrivitoPrivateContent = new BasicLink(basicAttributes);
  }

  title(): string | null {
    return this._scrivitoPrivateContent.title();
  }

  query(): string | null {
    return this._scrivitoPrivateContent.query();
  }

  hash(): string | null {
    return this._scrivitoPrivateContent.hash();
  }

  rel(): string | null {
    return this._scrivitoPrivateContent.rel();
  }

  target(): string | null {
    return this._scrivitoPrivateContent.target();
  }

  url(): string | null {
    return this._scrivitoPrivateContent.url();
  }

  obj(): Obj | null {
    const obj = this._scrivitoPrivateContent.obj();
    return obj instanceof BasicObj ? wrapInAppClass(obj) : null;
  }

  queryParameters(): QueryParameters {
    return this._scrivitoPrivateContent.queryParameters();
  }

  copy(attributes: LinkAttributes): Link {
    const basicLink = this._scrivitoPrivateContent.copy(
      toBasicAttributes(attributes)
    );
    const link = Object.create(Link.prototype);
    link._scrivitoPrivateContent = basicLink;
    return link;
  }

  isExternal(): boolean {
    return this._scrivitoPrivateContent.isExternal();
  }

  isInternal(): boolean {
    return this._scrivitoPrivateContent.isInternal();
  }
}

const ALLOWED_ATTRIBUTES = [
  'hash',
  'obj',
  'query',
  'rel',
  'target',
  'title',
  'url',
];

function assertValidPublicAttributes(attributes: LinkAttributes) {
  const unknownAttrs = difference(Object.keys(attributes), ALLOWED_ATTRIBUTES);
  if (!isEmpty(unknownAttrs)) {
    throw new ArgumentError(
      `Unexpected attributes ${prettyPrint(unknownAttrs)}.` +
        ` Available attributes: ${prettyPrint(ALLOWED_ATTRIBUTES)}`
    );
  }
}

function toBasicAttributes(attributes: LinkAttributes): BasicLinkAttributes {
  assertValidPublicAttributes(attributes);
  if (attributes.hasOwnProperty('obj')) {
    return {
      ...attributes,
      objId: objIdFromObjValue(attributes.obj),
    };
  }
  return attributes;
}

function objIdFromObjValue(obj: Obj | null | undefined): string | null {
  if (!obj) return null;

  return unwrapAppClass(obj).id();
}
