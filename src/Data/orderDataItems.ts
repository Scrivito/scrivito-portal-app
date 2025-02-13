import { orderBy } from 'lodash-es'
import { DataConnectionResultItem } from 'scrivito'

export function orderDataItems(
  order: Array<[string, 'asc' | 'desc']>,
  items: DataConnectionResultItem[],
): DataConnectionResultItem[] {
  if (order.length === 0) return items

  return orderBy(
    items,
    order.map(([attr]) => attr),
    order.map(([_, ascOrDesc]) => ascOrDesc),
  )
}
