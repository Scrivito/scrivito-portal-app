import { FinishedWithOptionalValueIterator as Iterator } from 'scrivito_sdk/common/finished_with_optional_value_iterator';

export function extractFromIterator<T>(
  iterator: Iterator<T>,
  size: number | undefined
) {
  const result = [];

  while (result.length !== size) {
    const next = iterator.next();
    if (next.done) return result;

    result.push(next.value);
  }

  return result;
}
