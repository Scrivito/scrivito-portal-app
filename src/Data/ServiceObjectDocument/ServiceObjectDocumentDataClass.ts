import { DataClassAttributes } from '../types'
import { localStorageServiceObjectDocumentDataClass } from './LocalStorage/localStorageServiceObjectDocumentDataClass'
import { pisaServiceObjectDocumentDataClass } from './Pisa/pisaServiceObjectDocumentDataClass'

const attributes: DataClassAttributes = {}

export const ServiceObjectDocument = import.meta.env.ENABLE_PISA
  ? pisaServiceObjectDocumentDataClass(attributes)
  : localStorageServiceObjectDocumentDataClass(attributes)
