import { InternalError, throwInvalidArgumentsError } from 'scrivito_sdk/common';
import { currentObjSpaceId, isWrappingBasicObj } from 'scrivito_sdk/models';
import { Binary } from 'scrivito_sdk/models/binary';
import { Obj } from 'scrivito_sdk/realm';
import { failIfFrozen } from 'scrivito_sdk/state';

export interface BinaryHandler {
  copyBinary(
    copyId: string,
    objId: string,
    filename?: string,
    contentType?: string
  ): Promise<{ id: string }>;
  uploadBinary(
    objId: string,
    blob: Blob,
    filename?: string,
    contentType?: string
  ): Promise<{ id: string }>;
}

let binaryHandler: BinaryHandler | undefined;

export function setBinaryHandler(handler: BinaryHandler | undefined): void {
  binaryHandler = handler;
}

export type SourceSpec = SourceSpecIdToCopy | { source: Blob | File };
interface SourceSpecIdToCopy {
  idToCopy: string;
}

export interface FutureBinaryOptions {
  contentType?: string;
  filename?: string;
}

/** @public */
export class FutureBinary {
  /** @internal */
  readonly idToCopy?: string;

  /** @internal */
  readonly source?: Blob | File;

  /** @internal */
  readonly contentType?: string;

  /** @internal */
  readonly filename?: string;

  /** @internal */
  constructor(sourceSpec: SourceSpec, options: FutureBinaryOptions = {}) {
    let filename = options.filename;
    this.contentType = options.contentType;

    if (isIdToCopySource(sourceSpec)) {
      this.idToCopy = sourceSpec.idToCopy;
    } else {
      const { source } = sourceSpec;
      this.source = source;
      if (!this.contentType) {
        this.contentType = source.type;
      }
      if (!filename) {
        filename = (source as File).name;
      }
    }

    if (filename) {
      this.filename = filename.replace(/[^\w\-_\.$]/g, '-');
    }
  }

  into(target: Obj): Promise<Binary>;

  /** @internal */
  into(target: Obj): Promise<Binary> {
    checkInto(target);
    failIfFrozen('Changing CMS content');

    return this.intoId(target._scrivitoPrivateContent.id());
  }

  /** @internal */
  async intoId(targetId: string): Promise<Binary> {
    if (!binaryHandler) throw new InternalError();

    let result;
    if (this.idToCopy) {
      result = await binaryHandler.copyBinary(
        this.idToCopy,
        targetId,
        this.filename,
        this.contentType
      );
    } else {
      if (!this.source) throw new InternalError();
      result = await binaryHandler.uploadBinary(
        targetId,
        this.source,
        this.filename,
        this.contentType
      );
    }

    return new Binary(result.id, currentObjSpaceId());
  }
}

function checkInto(target: Obj) {
  if (!isWrappingBasicObj(target)) {
    throwInvalidArgumentsError(
      'FutureBinary#into',
      "'target' must be an instance of 'Obj'.",
      { docPermalink: 'js-sdk/FutureBinary-into' }
    );
  }
}

function isIdToCopySource(toCheck: unknown): toCheck is SourceSpecIdToCopy {
  return !!(toCheck as SourceSpecIdToCopy).idToCopy;
}
