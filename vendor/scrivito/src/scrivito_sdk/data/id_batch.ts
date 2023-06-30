import { LoadableCollection, LoadableData, load } from 'scrivito_sdk/loadable';

export interface QueryData {
  results: string[];
  total?: number;
  continuation?: string;
}

const FALLBACK_RESPONSE: QueryData = {
  results: [],
  total: 0,
};

type LoadBatch<Params> = (
  params: Params,
  continuation: string | undefined,
  size: number
) => Promise<QueryData>;

type Invalidation<Params> = (params: Params) => string;

export class IdBatchCollection<Params> {
  private readonly loadableCollection: LoadableCollection<
    QueryData,
    [Params, number],
    number
  >;

  private loadBatch: LoadBatch<Params>;

  private fakeQuery: ((params: Params) => QueryData) | undefined;

  constructor({
    recordedAs,
    loadBatch,
    invalidation,
  }: {
    recordedAs: string;
    loadBatch: LoadBatch<Params>;
    invalidation: Invalidation<Params>;
  }) {
    this.loadBatch = loadBatch;

    this.loadableCollection = new LoadableCollection({
      recordedAs,
      loadElement: ([params, index]: [Params, number], batchSize: number) => ({
        loader: () => this.loader(params, index, batchSize),
        invalidation: () => invalidation(params),
      }),
    });
  }

  getQueryCount(params: Params): number {
    return this.getBatch(params, 0, 0).count();
  }

  getBatch(params: Params, batchSize: number, index: number): IdBatch {
    return new IdBatch(
      this.loadableCollection.get([params, index], batchSize),
      this.fakeQuery && this.fakeQuery(params)
    );
  }

  // For test purposes only
  storeBatch(params: Params, index: number, result: QueryData) {
    this.loadableCollection.get([params, index]).set(result);
  }

  // For test purposes only
  setupFakeQuery(searchFn: (params: Params) => QueryData) {
    this.fakeQuery = searchFn;
  }

  // For test purposes only
  clearFakeQuery() {
    this.fakeQuery = undefined;
  }

  // For test purposes only
  usesFakeQuery(): boolean {
    return !!this.fakeQuery;
  }

  private loader(
    params: Params,
    index: number,
    batchSize: number
  ): Promise<QueryData> {
    if (index === 0) return this.loadBatch(params, undefined, batchSize);

    const previousBatch = this.getBatch(params, batchSize, index - 1);
    return load(() => previousBatch.continuationForNextBatch()).then(
      (continuation) => {
        if (!continuation) {
          // no continuation means the index is too large (beyond the last batch)
          // note: only the first batch's 'total' value is ever used
          return { results: [], total: -1 };
        }

        return this.loadBatch(params, continuation, batchSize);
      }
    );
  }
}

class IdBatch {
  constructor(
    private readonly data: LoadableData<QueryData>,
    private readonly fakeData?: QueryData
  ) {}

  ids() {
    return this.response().results;
  }

  count() {
    return this.response().total || 0;
  }

  hasNextBatch(): boolean {
    return !!this.continuationForNextBatch();
  }

  continuationForNextBatch(): string | undefined {
    return this.response().continuation;
  }

  private response() {
    if (this.fakeData && !this.data.isAvailable()) return this.fakeData;

    return this.data.getWithDefault(FALLBACK_RESPONSE);
  }
}
