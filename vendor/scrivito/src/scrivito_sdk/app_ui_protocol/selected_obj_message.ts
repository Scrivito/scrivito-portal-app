// experimental, no unit tests cover this module
export interface SelectedObjMessage {
  type: 'ScrivitoSelectedObj';
  objId: string | null;
}

export function isSelectedObjMessage(
  data: unknown
): data is SelectedObjMessage {
  return (
    !!data &&
    typeof data === 'object' &&
    'type' in data &&
    data.type === 'ScrivitoSelectedObj' &&
    'objId' in data &&
    (data.objId === null || typeof data.objId === 'string')
  );
}
