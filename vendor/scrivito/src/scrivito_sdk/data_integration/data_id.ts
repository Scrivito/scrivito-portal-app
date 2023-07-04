export type DataId = string;

export function isValidDataId(id: unknown): id is DataId {
  return (
    typeof id === 'string' &&
    (!!id.match(/^\d+(-\d+)*$/) ||
      !!id.match(/^[a-f0-9]{8,}(-[a-f0-9]{8,})*$/i))
  );
}
