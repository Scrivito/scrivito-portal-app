import { DataClassAttributes } from '../types'
import { localStorageEventDataClass } from './LocalStorage/localStorageEventDataClass'
import { pisaEventDataClass } from './Pisa/pisaEventDataClass'

const attributes: DataClassAttributes = {
  description: 'string',
  keyword: 'string',
  language: 'string', // TODO: convert to enum, once fully available
  location: 'string',
  number: 'string',
  organizer: 'string',
  status: 'string', // TODO: convert to enum, once fully available
  url: 'string',
}

export const Event = import.meta.env.ENABLE_PISA
  ? pisaEventDataClass(attributes)
  : localStorageEventDataClass(attributes)
