import { localStorageGdprDataClass } from './LocalStorage/localStorageGdprDataClass'
import { pisaGdprDataClass } from './Pisa/pisaGdprDataClass'

export const GdprPromise = import.meta.env.ENABLE_PISA
  ? pisaGdprDataClass()
  : localStorageGdprDataClass()
