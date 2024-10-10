import { provideEditingConfig } from 'scrivito'
import { Ticket } from './TicketDataClass'

provideEditingConfig(Ticket, {
  title: 'Ticket',
  attributes: {
    attachments: { title: 'Attachments' },
    createdBy: { title: 'Created by ID' },
    responsibleAgent: { title: 'Responsible agent ID' },
  },
})
