import { provideEditingConfig } from 'scrivito'
import { Ticket } from './TicketDataClass'

provideEditingConfig(Ticket, {
  title: 'Ticket',
  attributes: {
    title: { title: 'Title' },
    description: { title: 'Description' },
    number: { title: 'Ticket number' },
    referenceNumber: { title: 'Reference number' },
    type: { title: 'Type (code)' },
    typeLocalized: { title: 'Type (human readable)' },
    status: { title: 'Status (code)' },
    statusLocalized: { title: 'Status (code)' },
    open: { title: 'Open?' },
    responsibleAgent: { title: 'Responsible agent (ID)' },
    createdBy: { title: 'Created by (ID)' },
    createdAt: { title: 'Created at' },
    updatedAt: { title: 'Updated at' },
    attachments: { title: 'Attachments' },
  },
})
