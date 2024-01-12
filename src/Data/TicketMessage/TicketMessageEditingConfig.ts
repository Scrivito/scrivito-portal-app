import { provideEditingConfig } from 'scrivito'
import { TicketMessage } from './TicketMessageDataClass'

provideEditingConfig(TicketMessage, {
  title: 'Ticket Message',
  attributes: {
    ticketId: { title: 'Ticket ID' },
    text: { title: 'Text' },
    createdBy: { title: 'Created by (ID)' },
    createdAt: { title: 'Created at' },
  },
})
