import { provideEditingConfig } from 'scrivito'
import { CallbackRequestPromise } from './CallbackRequestDataClass'

CallbackRequestPromise.then((CallbackRequest) => {
  provideEditingConfig(CallbackRequest, {
    title: 'Callback request',
    attributes: {
      _id: { title: 'Callback request ID' },
      message: { title: 'Message' },
    },
  })
})
