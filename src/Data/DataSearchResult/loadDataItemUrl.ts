import { getDataClass, load, urlForDataItem } from 'scrivito'

export async function loadDataItemUrl(
  dataClassName: string,
  id: string,
): Promise<string | null> {
  const dataClass = getDataClass(dataClassName)
  if (!dataClass) return null

  return load(() => {
    const dataItem = dataClass.get(id)
    return dataItem ? urlForDataItem(dataItem) : null
  })
}
