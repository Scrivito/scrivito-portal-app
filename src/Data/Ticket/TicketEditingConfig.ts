import { provideEditingConfig } from 'scrivito'
import { Ticket } from './TicketDataClass'

provideEditingConfig(Ticket, {
  title: 'Ticket',
  attributes: {
    attachments: { title: 'Attachments' },

    // TODO: Remove the following attributes, once #11338 is resolved:
    createdAt: { title: 'Created at' },
    createdBy: { title: 'Created by' },
    description: { title: 'Description' },
    number: { title: 'Number' },
    open: { title: 'Open?' },
    referenceNumber: { title: 'Reference number' },
    responsibleAgent: { title: 'Responsible agent' },
    serviceObject: { title: 'Service object' },
    status: { title: 'Status' },
    title: { title: 'Keyword' },
    type: { title: 'Type' },
    updatedAt: { title: 'Updated at' },
  },
})
