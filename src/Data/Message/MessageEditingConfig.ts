import { provideEditingConfig } from 'scrivito'
import { Message } from './MessageDataClass'

provideEditingConfig(Message, {
  title: 'Message',
  attributes: {
    attachments: { title: 'Attachments' },
    subjectId: { title: 'Subject ID' },

    // TODO: Remove the following attributes, once #11338 is resolved:
    createdAt: { title: 'Sent at' },
    createdBy: { title: 'Sent by' },
    text: { title: 'Text' },
  },
})
