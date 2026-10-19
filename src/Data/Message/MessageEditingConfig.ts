import { provideEditingConfig } from 'scrivito'

provideEditingConfig('Message', {
  attributes: {
    attachments: { title: 'Attachments' },
    subjectId: { title: 'Subject ID' },
  },
})
