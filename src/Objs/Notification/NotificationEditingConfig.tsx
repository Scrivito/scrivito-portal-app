import { provideEditingConfig } from 'scrivito'
import { Notification } from './NotificationObjClass'

provideEditingConfig(Notification, {
  title: 'Notification',
  attributes: {
    createdAt: { title: 'Created at', description: 'Format: YYYY-MM-DD' },
    details: {
      title: 'Details',
      options: { multiLine: true },
    },
    title: { title: 'Title' },
  },
  titleForContent: (obj) => obj.get('title'),
  properties: ['title', 'details', 'createdAt'],
  initialContent: {
    icon: 'bi-info-circle',
    createdAt: () => new Date().toLocaleDateString('en-CA'),
  },
  hideInSelectionDialogs: true,
})
