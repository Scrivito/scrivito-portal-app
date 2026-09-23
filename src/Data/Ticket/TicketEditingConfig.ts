import { provideEditingConfig } from 'scrivito'
import { Ticket } from './TicketDataClass'

provideEditingConfig(Ticket, {
  attributes: {
    attachments: { title: 'Attachments' },
  },
})
