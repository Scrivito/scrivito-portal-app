import { DataClassAttributes } from '../types'
import { localStorageServiceObjectDocumentDataClass } from './LocalStorage/localStorageServiceObjectDocumentDataClass'
import { pisaServiceObjectDocumentDataClass } from './Pisa/pisaServiceObjectDocumentDataClass'

const attributes: DataClassAttributes = {
  documentId: 'string', // TODO: convert to reference, once fully available
  serviceObjectId: 'string', // TODO: convert to reference, once fully available
}

export const ServiceObjectDocument = import.meta.env.ENABLE_PISA
  ? pisaServiceObjectDocumentDataClass(attributes)
  : localStorageServiceObjectDocumentDataClass(attributes)
