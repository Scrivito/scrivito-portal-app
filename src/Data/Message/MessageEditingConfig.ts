import { provideEditingConfig } from 'scrivito'
import { MessagePromise } from './MessageDataClass'

MessagePromise.then((Message) => {
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
})
