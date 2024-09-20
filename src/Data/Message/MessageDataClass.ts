import { localStorageMessageDataClass } from './LocalStorage/localStorageMessageDataClass'
import { pisaMessageDataClass } from './Pisa/pisaMessageDataClass'

export const Message = import.meta.env.ENABLE_PISA
  ? pisaMessageDataClass()
  : localStorageMessageDataClass()
