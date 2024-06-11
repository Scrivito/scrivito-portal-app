import { localStorageMessageDataClass } from './LocalStorage/localStorageMessageDataClass'
import { pisaMessageDataClass } from './Pisa/pisaMessageDataClass'

export const MessagePromise = import.meta.env.ENABLE_PISA
  ? pisaMessageDataClass()
  : localStorageMessageDataClass()
