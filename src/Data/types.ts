export interface RawItem {
  _id: string
  [key: string]: unknown
}

export interface DataIndexResponse {
  results: RawItem[]
  count?: number
  continuation?: string
}
