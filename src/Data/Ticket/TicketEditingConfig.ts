import { provideEditingConfig } from 'scrivito'
import { TicketPromise } from './TicketDataClass'

TicketPromise.then((Ticket) => {
  provideEditingConfig(Ticket, {
    title: 'Ticket',
    attributes: {
      _id: { title: 'Ticket ID' },
      title: { title: 'Title' },
      description: { title: 'Description' },
      number: { title: 'Ticket number' },
      referenceNumber: { title: 'Reference number' },
      type: { title: 'Type' },
      status: { title: 'Status' },
      open: { title: 'Open?' },
      responsibleAgent: { title: 'Responsible agent (ID)' },
      createdBy: { title: 'Created by (ID)' },
      createdAt: { title: 'Created at' },
      updatedAt: { title: 'Updated at' },
      attachments: { title: 'Attachments' },
    },
  })
})
