import { provideEditingConfig } from 'scrivito'
import { Message } from './MessageDataClass'

provideEditingConfig(Message, {
  attributes: {
    attachments: { title: 'Attachments' },
    subjectId: { title: 'Subject ID' },
  },
})
