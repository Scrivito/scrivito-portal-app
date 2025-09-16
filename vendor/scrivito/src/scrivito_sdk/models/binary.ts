import isEmpty from 'lodash-es/isEmpty';
import isEqual from 'lodash-es/isEqual';

import * as URI from 'urijs';

import {
  BackendBinaryData,
  ObjSpaceId,
  cmsRetrieval,
} from 'scrivito_sdk/client';
import {
  ArgumentError,
  InternalError,
  ScrivitoError,
  equals,
  isBlob,
  isFile,
  throwInvalidArgumentsError,
} from 'scrivito_sdk/common';
import { assertNotUsingInMemoryTenant } from 'scrivito_sdk/data';
import { LoadableData, createLoadableCollection } from 'scrivito_sdk/loadable';
import { publishedSpace } from 'scrivito_sdk/models';
import { FutureBinary } from 'scrivito_sdk/models/future_binary';
import { MetadataCollection } from 'scrivito_sdk/models/metadata_collection';

type CollectionKey = [string, TransformationDefinition | undefined];

const loadableCollection = createLoadableCollection({
  name: 'binary',
  loadElement: (
    [binaryId, transformation]: CollectionKey,
    objSpaceId: ObjSpaceId
  ) => ({
    loader: () =>
      cmsRetrieval.retrieveBinaryUrls(binaryId, transformation, {
        accessVia: objSpaceId,
      }),
  }),
});

// this is a small, 1x1 pixel, fully transparent GIF image
const PLACEHOLDER_URL =
  'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

export interface TransformationDefinition {
  height?: number;
  width?: number;
}

interface BinaryUploadOptions {
  filename?: string;
  contentType?: string;
}

interface BinaryStoreOptions extends BinaryUploadOptions {
  transformation?: TransformationDefinition;
}

// For test purpose only.
export function storeBinary(
  binaryId: string,
  options: BinaryStoreOptions,
  response: BackendBinaryData
): Binary {
  const transformation = options.transformation;

  loadableCollection.get([binaryId, transformation]).set(response);

  const raw = new Binary(binaryId, publishedSpace()).raw();

  if (transformation) {
    return raw.optimizeFor(transformation);
  }

  return raw;
}

/** @public */
export class Binary {
  static upload(
    source: Blob | File,
    options?: BinaryUploadOptions
  ): FutureBinary;

  /** @internal */
  static upload(
    source: Blob | File,
    options?: BinaryUploadOptions
  ): FutureBinary {
    checkUpload(source, options);

    if (!isFile(source)) {
      if (!(options && options.filename)) {
        throw new ArgumentError(
          'Expected a filename to be passed with Blob as the source.'
        );
      }
    }

    return new FutureBinary({ source }, options);
  }

  /** @internal */
  private _transformation?: TransformationDefinition;

  /** @internal */
  private _loadableData: LoadableData<BackendBinaryData>;

  /** @internal */
  constructor(
    /** @internal */
    private readonly _id: string,

    /** @internal */
    private readonly _objSpaceId: ObjSpaceId = publishedSpace(),
    transformation: TransformationDefinition | null = {}
  ) {
    this._transformation = transformation || undefined;

    this._loadableData = loadableCollection.get(
      [this._id, this._transformation],
      this._objSpaceId
    );
  }

  /** @internal */
  id(): string {
    return this._id;
  }

  copy(options?: BinaryUploadOptions): FutureBinary {
    return new FutureBinary({ idToCopy: this._id }, options);
  }

  isPrivate(): boolean {
    return !equals(this._objSpaceId, publishedSpace());
  }

  optimizeFor(transformation: TransformationDefinition): Binary {
    return new Binary(this._id, this._objSpaceId, {
      ...this._transformation,
      ...transformation,
    });
  }

  original(): Binary {
    return new Binary(this._id, this._objSpaceId, {});
  }

  raw(): Binary {
    return new Binary(this._id, this._objSpaceId, null);
  }

  /** @internal */
  isExplicitlyTransformed(): boolean {
    return this.isTransformed() && !isEmpty(this._transformation);
  }

  /** @internal */
  isRaw(): boolean {
    return !this.isTransformed();
  }

  url(): string {
    assertNotUsingInMemoryTenant('Binary#url');
    return this.urlWithoutPlaceholder() || PLACEHOLDER_URL;
  }

  /** @internal */
  urlWithoutPlaceholder(): string | undefined {
    const data = this._loadableData.get();

    if (!data) {
      return;
    }

    const accessData = data[this.accessType()];

    if (!accessData) {
      // Missing key in binary data
      throw new InternalError();
    }

    return accessData.get.url;
  }

  filename(): string {
    const url = this.url();

    if (!url || url.match(/^data:/)) {
      return '';
    }

    return URI(url).path().split('/').pop() || '';
  }

  metadata(): MetadataCollection {
    this.assertNotTransformed('Metadata');

    return new MetadataCollection(this._id, this._objSpaceId);
  }

  contentType(): string {
    this.assertNotTransformed('Content type');

    return this.metadata().contentType();
  }

  contentLength(): number {
    this.assertNotTransformed('Content length');

    return this.metadata().contentLength();
  }

  /** @internal */
  extname(): string {
    if (this.raw().filename().indexOf('.') > -1) {
      const parts = this.raw()
        .filename()
        .split(/[.\\]+/);

      if (parts.length > 1) return parts[parts.length - 1].toLowerCase();
    }

    return '';
  }

  /** @internal */
  equals(binary: Binary): boolean {
    return (
      this.id() === binary.id() &&
      equals(this._objSpaceId, binary.objSpaceId()) &&
      isEqual(this.definition(), binary.definition())
    );
  }

  /** @internal */
  isImage(): boolean {
    const rawContentType = this.raw().contentType();

    if (rawContentType) {
      return rawContentType.split('/')[0] === 'image';
    }

    return false;
  }

  /**
   * For test purpose only.
   * @internal
   */
  definition(): TransformationDefinition | null {
    return this._transformation || null;
  }

  /** @internal */
  objSpaceId(): ObjSpaceId {
    return this._objSpaceId;
  }

  /** @internal */
  private accessType() {
    if (this.isPrivate()) {
      return 'private_access';
    }
    return 'public_access';
  }

  /** @internal */
  private assertNotTransformed(fieldName: string) {
    if (this.isTransformed()) {
      throw new ScrivitoError(
        `"${fieldName}" is not available for transformed images.` +
          ' Use "Scrivito.Binary#raw" to access the untransformed version of the image.'
      );
    }
  }

  /** @internal */
  private isTransformed() {
    return !!this._transformation;
  }
}

function checkUpload(source: Blob | File, options?: BinaryUploadOptions) {
  if (!(isBlob(source) || isFile(source))) {
    throwInvalidArgumentsError(
      'Binary.upload',
      "'source' must be a 'Blob' or a 'File'.",
      { docPermalink: 'js-sdk/Binary-static-upload' }
    );
  }

  if (!['string', 'undefined'].includes(typeof options?.contentType)) {
    throwInvalidArgumentsError(
      'Binary.upload',
      "'options.contentType' must be a 'String'.",
      { docPermalink: 'js-sdk/Binary-static-upload' }
    );
  }

  if (!['string', 'undefined'].includes(typeof options?.filename)) {
    throwInvalidArgumentsError(
      'Binary.upload',
      "'options.filename' must be a 'String'.",
      { docPermalink: 'js-sdk/Binary-static-upload' }
    );
  }
}
