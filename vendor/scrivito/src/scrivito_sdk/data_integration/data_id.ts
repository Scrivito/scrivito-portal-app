export type DataId = string;

export function isValidDataId(id: unknown): id is DataId {
  return (
    typeof id === 'string' && !id.includes('^') && /^[\x21-\x7D]+$/.test(id) // all printable ASCII characters except tilde
  );
}
