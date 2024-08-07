import { DataClassAttributes } from '../types'
import { localStorageEventDocumentDataClass } from './LocalStorage/localStorageEventDocumentDataClass'
import { pisaEventDocumentDataClass } from './Pisa/pisaEventDocumentDataClass'

const attributes: DataClassAttributes = {
  documentId: 'string', // TODO: convert to reference, once fully available
  eventId: 'string', // TODO: convert to reference, once fully available
}

export const EventDocument = import.meta.env.ENABLE_PISA
  ? pisaEventDocumentDataClass(attributes)
  : localStorageEventDocumentDataClass(attributes)
