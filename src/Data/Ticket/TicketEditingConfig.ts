import { provideEditingConfig } from 'scrivito'
import { Ticket } from './TicketDataClass'

provideEditingConfig(Ticket, {
  title: 'Ticket',
  attributes: {
    title: { title: 'Title' },
    description: { title: 'Description' },
    number: { title: 'Ticket number' },
    referenceNumber: { title: 'Reference number' },
    type: { title: 'Type (enum)' },
    typeLocalized: { title: 'Type (localized)' },
    status: { title: 'Status (enum)' },
    statusLocalized: { title: 'Status (enum)' },
    open: { title: 'Open?' },
    responsibleAgent: { title: 'Responsible agent (ID)' },
    createdBy: { title: 'Created by (ID)' },
    createdAt: { title: 'Created at' },
    updatedAt: { title: 'Updated at' },
    attachments: { title: 'Attachments' },
  },
})
