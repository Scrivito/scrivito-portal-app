import { IteratorResult } from 'scrivito_sdk/common';
import {
  DataQuery,
  DataQueryContinuation,
  DataQueryIterator,
} from 'scrivito_sdk/data';

interface IdBatch {
  ids(): string[];
  hasNextBatch(): boolean;
}

type GetBatch = (batchNumber: number) => IdBatch;

export class IdBatchQuery implements DataQuery<string> {
  constructor(private readonly getBatch: GetBatch) {}

  iterator() {
    return new IdBatchQueryIterator(this.getBatch);
  }

  iteratorFromContinuation(continuation: DataQueryContinuation) {
    return new IdBatchQueryIterator(this.getBatch, continuation);
  }
}

interface IdIndex {
  [id: string]: true | undefined;
}

class IdBatchQueryIterator implements DataQueryIterator<string> {
  private batchNumber = 0;
  private currentIndex = 0;
  private priorIdIndex?: IdIndex;
  private currentIds?: string[];
  private currentBatch: IdBatch | undefined;

  constructor(
    private readonly getBatch: GetBatch,
    continuation?: DataQueryContinuation
  ) {
    if (continuation) {
      [this.batchNumber, this.currentIndex] = continuation;
    }
    this.currentBatch = this.getBatch(this.batchNumber);
  }

  next(): IteratorResult<string> {
    if (!this.currentBatch) return { done: true };

    if (!this.currentIds) this.currentIds = this.currentBatch.ids();

    if (this.currentIndex >= this.currentIds.length) {
      this.currentIds = undefined;
      this.currentIndex = 0;

      if (this.currentBatch.hasNextBatch()) {
        this.batchNumber = this.batchNumber + 1;
        this.currentBatch = this.getBatch(this.batchNumber);
      } else {
        this.currentBatch = undefined;
      }

      return this.next();
    }

    if (!this.priorIdIndex) {
      const idIndex: IdIndex = {};

      if (this.batchNumber > 0) {
        const previousBatch = this.getBatch(this.batchNumber - 1);
        previousBatch.ids().forEach((id) => {
          idIndex[id] = true;
        });
      }

      const thisBatchPreviousIds = this.currentBatch
        .ids()
        .slice(0, this.currentIndex);
      thisBatchPreviousIds.forEach((id) => {
        idIndex[id] = true;
      });

      this.priorIdIndex = idIndex;
    }

    const id = this.currentIds[this.currentIndex];
    this.currentIndex++;

    if (this.priorIdIndex[id]) return this.next();
    this.priorIdIndex[id] = true;

    return {
      value: id,
      done: false,
    };
  }

  continuation(): DataQueryContinuation | undefined {
    return this.currentBatch
      ? [this.batchNumber, this.currentIndex]
      : undefined;
  }
}
