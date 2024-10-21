import type { provideDataClass } from 'scrivito'

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
export type DataClassAttributes = Readonly<Params['attributes']>

type ExtractDataClassSchema<T> = T extends Promise<infer U> ? U : never
export type DataClassSchema = ExtractDataClassSchema<DataClassAttributes>

// TODO: Remove when #11321 is resolved
type ExtractReadonlyDataClassSchema<T> =
  T extends Promise<infer U> ? { [K in keyof U]: Readonly<U[K]> } : never
export type ReadonlyDataClassSchema =
  ExtractReadonlyDataClassSchema<DataClassAttributes>
