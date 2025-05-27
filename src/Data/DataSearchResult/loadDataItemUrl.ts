import { getDataClass, load, urlForDataItem } from 'scrivito'

export async function loadDataItemUrl(
  dataClassName: string,
  id: string,
): Promise<string | null> {
  const dataClass = getDataClass(dataClassName)
  if (!dataClass) return null

  const dataItem = await load(() => dataClass.get(id))
  if (!dataItem) return null

  return load(() => urlForDataItem(dataItem))
}
