import { DataItem, getDataClass, load, urlForDataItem } from 'scrivito'

export async function calculateUrl(
  id: string,
  className: string,
): Promise<string> {
  const dataItem = await getDataItem(id, className)
  if (!dataItem) return ''

  const url = await load(() => urlForDataItem(dataItem))
  return url ?? ''
}

async function getDataItem(
  id: string,
  className: string,
): Promise<DataItem | null> {
  const dataClass = getDataClass(className)
  if (!dataClass) return null

  const dataItem = await load(() => dataClass.get(id))
  return dataItem
}
