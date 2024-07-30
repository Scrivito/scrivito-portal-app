import { provideEditingConfig } from 'scrivito'
import { CallbackRequest } from './CallbackRequestDataClass'

provideEditingConfig(CallbackRequest, {
  title: 'Callback request',
  attributes: {
    _id: { title: 'Callback request ID' },
    message: { title: 'Message' },
  },
})
