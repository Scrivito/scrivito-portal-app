import { provideEditingConfig } from 'scrivito'
import { Message } from './MessageDataClass'

provideEditingConfig(Message, {
  title: 'Message',
  attributes: {
    _id: { title: 'Message ID' },
    subjectId: { title: 'Subject ID' },
    text: { title: 'Text' },
    createdBy: { title: 'Created by (ID)' },
    createdAt: { title: 'Created at' },
    attachments: { title: 'Attachments' },
  },
})
