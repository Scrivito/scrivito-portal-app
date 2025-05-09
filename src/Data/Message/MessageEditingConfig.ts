import { provideEditingConfig } from 'scrivito'
import { Message } from './MessageDataClass'

provideEditingConfig(Message, {
  attributes: {
    subjectId: { title: 'Subject ID' },
  },
})
