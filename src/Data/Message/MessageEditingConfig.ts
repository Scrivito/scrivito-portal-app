import { provideEditingConfig } from 'scrivito'
import { Message } from './MessageDataClass'

provideEditingConfig(Message, {
  title: 'Message',
  attributes: {
    attachments: { title: 'Attachments' },
  },
})
