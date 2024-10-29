import { provideEditingConfig } from 'scrivito'
import { CallbackRequest } from './CallbackRequestDataClass'

provideEditingConfig(CallbackRequest, {
  title: 'Callback request',
  attributes: {
    // TODO: Remove the following attributes, once #11338 is resolved:
    message: { title: 'Message' },
  },
})
