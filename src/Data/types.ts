import type { provideDataClass } from 'scrivito'

type UnPromise<T> = T extends Promise<infer U> ? U : never

export interface RawItem {
  _id: string
  [key: string]: unknown
}

export interface DataIndexResponse {
  results: RawItem[]
  count?: number
  continuation?: string
}

type ProvideDataClassParams = Parameters<typeof provideDataClass>[1]

export type DataConnection = UnPromise<ProvideDataClassParams['connection']>

export type DataClassAttributes = Readonly<ProvideDataClassParams['attributes']>

export type DataClassSchema = UnPromise<DataClassAttributes>

// TODO: Remove when #11321 is resolved
type ExtractReadonlyDataClassSchema<T> =
  T extends Promise<infer U> ? { [K in keyof U]: Readonly<U[K]> } : never
export type ReadonlyDataClassSchema =
  ExtractReadonlyDataClassSchema<DataClassAttributes>
