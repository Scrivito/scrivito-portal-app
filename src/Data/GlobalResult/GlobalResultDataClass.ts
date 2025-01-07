import { localStorageGlobalResultDataClass } from './LocalStorage/localStorageGlobalResultDataClass'
import { pisaGlobalResultDataClass } from './Pisa/pisaGlobalResultDataClass'

export const GlobalResult = import.meta.env.ENABLE_PISA
  ? pisaGlobalResultDataClass()
  : localStorageGlobalResultDataClass()
