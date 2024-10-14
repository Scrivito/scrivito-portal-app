import type { DataItem, provideDataClass } from 'scrivito'

export interface RawItem {
  _id: string
  [key: string]: unknown
}

export interface DataIndexResponse {
  results: RawItem[]
  count?: number
  continuation?: string
}

export type DataConnection = Parameters<
  typeof provideDataClass
>[1]['connection'] extends Partial<infer U> | Promise<Partial<infer U>>
  ? Partial<U>
  : never

type ProvideDataClassFunction = typeof provideDataClass
type Params = Parameters<ProvideDataClassFunction>[1]
export type DataClassAttributes = NonNullable<Params['attributes']>

type ExtractDataClassSchema<T> = T extends Promise<infer U> ? U : never
export type DataClassSchema = ExtractDataClassSchema<DataClassAttributes>

export function isDataItem(item: unknown): item is DataItem {
  if (typeof item !== 'object' || item === null) return false

  const dataItem = item as DataItem
  return (
    typeof dataItem.attributeDefinitions === 'function' &&
    typeof dataItem.dataClass === 'function' &&
    typeof dataItem.dataClassName === 'function' &&
    typeof dataItem.delete === 'function' &&
    typeof dataItem.get === 'function' &&
    typeof dataItem.id === 'function' &&
    typeof dataItem.obj === 'function' &&
    typeof dataItem.update === 'function'
  )
}
