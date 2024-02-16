import { provideEditingConfig } from 'scrivito'
import { Message } from './MessageDataClass'

provideEditingConfig(Message, {
  title: 'Message',
  attributes: {
    subjectId: { title: 'Subject ID' },
    text: { title: 'Text' },
    createdBy: { title: 'Created by (ID)' },
    createdAt: { title: 'Created at' },
    attachments: { title: 'Attachments' },
  },
})
