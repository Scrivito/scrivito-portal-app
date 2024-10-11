import { provideEditingConfig } from 'scrivito'
import { Ticket } from './TicketDataClass'

provideEditingConfig(Ticket, {
  title: 'Ticket',
  attributes: {
    attachments: { title: 'Attachments' },
  },
})
