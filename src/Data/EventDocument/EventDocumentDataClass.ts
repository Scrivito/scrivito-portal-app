import { DataClassAttributes } from '../types'
import { localStorageEventDocumentDataClass } from './LocalStorage/localStorageEventDocumentDataClass'
import { pisaEventDocumentDataClass } from './Pisa/pisaEventDocumentDataClass'

const attributes: DataClassAttributes = {}

export const EventDocument = import.meta.env.ENABLE_PISA
  ? pisaEventDocumentDataClass(attributes)
  : localStorageEventDocumentDataClass(attributes)
