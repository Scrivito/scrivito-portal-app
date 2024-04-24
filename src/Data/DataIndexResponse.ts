import { RawItem } from './RawItem'

export interface DataIndexResponse {
  results: RawItem[]
  count?: number
  continuation?: string
}
