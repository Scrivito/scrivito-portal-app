import isObject from 'lodash-es/isObject';

import {
  BackendMetadataResponse,
  ObjSpaceId,
  PUBLISHED_SPACE,
  cmsRetrieval,
} from 'scrivito_sdk/client';
import {
  ArgumentError,
  InternalError,
  camelCase,
  deserializeAsDate,
  isCamelCase,
  underscore,
} from 'scrivito_sdk/common';
import { assertNotUsingInMemoryTenant } from 'scrivito_sdk/data';
import { LoadableCollection, LoadableData } from 'scrivito_sdk/loadable';

export type BinaryMetadataValue = string | string[] | number | Date;

interface BinaryMetadata {
  [key: string]: BinaryMetadataValue;
}

enum BackendBinaryMetadataType {
  Date = 'date',
  Number = 'number',
  String = 'string',
  Stringlist = 'stringlist',
}

type BackendBinaryMetadataValue = string | string[] | number;

/** @public */
export class MetadataCollection {
  /**
   * For test purpose only.
   * @internal
   */
  private loadableData?: LoadableData<BackendMetadataResponse>;

  /** @internal */
  constructor(
    /** @internal */
    private readonly _binaryId?: string,

    /** @internal */
    private readonly objSpaceId: ObjSpaceId = PUBLISHED_SPACE
  ) {
    if (this._binaryId) {
      this.loadableData = loadableCollection.get(
        this._binaryId,
        this.objSpaceId
      );
    }
  }

  get(key: string): BinaryMetadataValue | null {
    assertNotUsingInMemoryTenant('MetadataCollection#get');
    assertCamelCase(key);

    const data = this.getData();

    if (data) {
      const underscoredKey = underscore(key);

      if (data.hasOwnProperty(underscoredKey)) return data[underscoredKey];

      return null;
    }

    return null;
  }

  /** @internal */
  keys(): string[] {
    const data = this.getData();

    if (data) return Object.keys(data).map(camelCase);

    return [];
  }

  /** @internal */
  contentLength(): number {
    const length = this.get('contentLength');

    if (typeof length !== 'number') return 0;

    return length;
  }

  /** @internal */
  contentType(): string {
    const type = this.get('contentType');

    if (typeof type !== 'string') return '';

    return type;
  }

  /**
   * For test purpose only.
   * @internal
   */
  binaryId(): string | undefined {
    return this._binaryId;
  }

  /** @internal */
  private getData(): BinaryMetadata | void {
    if (this.loadableData) {
      const metadata = this.loadableData.get();

      if (metadata) return deserializeMetadata(metadata);
    }
  }
}

// For test purpose only
export function storeMetadataCollection(
  binaryId: string,
  response: BackendMetadataResponse
): void {
  // deserialize once, as a sanity check
  deserializeMetadata(response);

  loadableCollection.get(binaryId).set(response);
}

const loadableCollection = new LoadableCollection({
  recordedAs: 'metadata',
  loadElement: (id, objSpaceId: ObjSpaceId) => ({
    loader: () =>
      cmsRetrieval.retrieveBinaryMetadata(id, { accessVia: objSpaceId }),
  }),
});

function deserializeMetadata(
  response: BackendMetadataResponse
): BinaryMetadata {
  const backendMetadata = response.meta_data;

  if (!isObject(backendMetadata)) {
    throw new InternalError();
  }

  const metadata: BinaryMetadata = {};

  for (const key of Object.keys(backendMetadata as object)) {
    const [backendType, backendValue] = (backendMetadata as object)[
      key as keyof typeof backendMetadata
    ] as [BackendBinaryMetadataType, BackendBinaryMetadataValue];

    if (backendValue === null || backendValue === undefined) {
      throw new InternalError();
    }

    let value: BinaryMetadataValue;

    if (backendType === BackendBinaryMetadataType.Date) {
      if (typeof backendValue === 'string') {
        value = deserializeAsDate(backendValue) as BinaryMetadataValue;
      } else {
        // Invalid non-string backend value for a date metadata
        throw new InternalError();
      }
    } else {
      value = backendValue as BinaryMetadataValue;
    }

    metadata[key] = value;
  }

  return metadata;
}

function assertCamelCase(key: string) {
  if (!isCamelCase(key)) {
    throw new ArgumentError(`Metadata key "${key}" is not in camel case.`);
  }
}
