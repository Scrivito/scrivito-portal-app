import { provideEditingConfig } from 'scrivito'
import { Message } from './MessageDataClass'

provideEditingConfig(Message, {
  title: 'Message',
  attributes: {
    attachments: { title: 'Attachments' },
    createdBy: { title: 'Created by ID' },
    subjectId: { title: 'Subject ID' },
  },
})
