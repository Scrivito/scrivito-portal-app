import isEmpty from 'lodash-es/isEmpty';

export function isEmptyValue(value: unknown) {
  return (
    value === null ||
    ((typeof value === 'string' || Array.isArray(value)) && isEmpty(value))
  );
}
