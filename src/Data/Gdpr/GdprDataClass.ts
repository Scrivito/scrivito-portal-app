import { localStorageGdprDataClass } from './LocalStorage/localStorageGdprDataClass'
import { pisaGdprDataClass } from './Pisa/pisaGdprDataClass'

export const Gdpr = import.meta.env.ENABLE_PISA
  ? pisaGdprDataClass()
  : localStorageGdprDataClass()
