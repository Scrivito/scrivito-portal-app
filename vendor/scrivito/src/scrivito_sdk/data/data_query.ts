import { ContinueIterable, ContinueIterator } from 'scrivito_sdk/common';

export type DataQueryContinuation = [number, number];
export type DataQueryIterator<T> = ContinueIterator<T, DataQueryContinuation>;

export type DataQuery<T> = ContinueIterable<T, DataQueryContinuation>;
