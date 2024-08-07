import { DataClassAttributes } from '../types'
import { localStorageDocumentDataClass } from './LocalStorage/localStorageDocumentDataClass'
import { pisaDocumentDataClass } from './Pisa/pisaDocumentDataClass'

const attributes: DataClassAttributes = {
  format: 'string',
  language: 'string', // TODO: convert to enum, once fully available
  number: 'string',
  title: 'string',
  type: 'string', // TODO: convert to enum, once fully available
  version: 'string',
}

export const Document = import.meta.env.ENABLE_PISA
  ? pisaDocumentDataClass(attributes)
  : localStorageDocumentDataClass(attributes)
