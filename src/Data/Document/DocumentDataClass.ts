import { localStorageDocumentDataClass } from './LocalStorage/localStorageDocumentDataClass'
import { pisaDocumentDataClass } from './Pisa/pisaDocumentDataClass'

export const Document = import.meta.env.ENABLE_PISA
  ? pisaDocumentDataClass()
  : localStorageDocumentDataClass()
