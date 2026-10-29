import { isObject } from 'scrivito_sdk/common/is_object';

interface KindOfBlob {
  size: number;
  type: string;
}

interface KindOfFile extends KindOfBlob {
  name: string;
}

export function isBlob(subject: unknown): subject is KindOfBlob {
  return (
    isObject(subject) &&
    'size' in subject &&
    typeof subject.size === 'number' &&
    'type' in subject &&
    typeof subject.type === 'string'
  );
}

export function isFile(subject: unknown): subject is KindOfFile {
  return (
    isBlob(subject) && 'name' in subject && typeof subject.name === 'string'
  );
}
