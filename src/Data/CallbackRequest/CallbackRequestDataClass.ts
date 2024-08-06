import { DataClassAttributes } from '../types'
import { localStorageCallbackRequestDataClass } from './LocalStorage/localStorageCallbackRequestDataClass'
import { pisaCallbackRequestDataClass } from './Pisa/pisaCallbackRequestDataClass'

const attributes: DataClassAttributes = {
  message: 'string',
}

export const CallbackRequest = import.meta.env.ENABLE_PISA
  ? pisaCallbackRequestDataClass(attributes)
  : localStorageCallbackRequestDataClass(attributes)
