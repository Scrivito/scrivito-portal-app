import { DataClassAttributes } from '../types'
import { localStorageGdprDataClass } from './LocalStorage/localStorageGdprDataClass'
import { pisaGdprDataClass } from './Pisa/pisaGdprDataClass'

const attributes: DataClassAttributes = {
  description: 'string',
  name: 'string',
}

export const Gdpr = import.meta.env.ENABLE_PISA
  ? pisaGdprDataClass(attributes)
  : localStorageGdprDataClass(attributes)
