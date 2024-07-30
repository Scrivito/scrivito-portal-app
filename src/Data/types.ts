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
