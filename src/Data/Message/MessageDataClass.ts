import { DataClassAttributes } from '../types'
import { localStorageMessageDataClass } from './LocalStorage/localStorageMessageDataClass'
import { pisaMessageDataClass } from './Pisa/pisaMessageDataClass'

const attributes: DataClassAttributes = {
  createdBy: 'string', // TODO: convert to reference, once fully available
  subjectId: 'string', // TODO: convert to reference, once fully available
  text: 'string',
}

export const Message = import.meta.env.ENABLE_PISA
  ? pisaMessageDataClass(attributes)
  : localStorageMessageDataClass(attributes)
