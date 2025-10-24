import { isUserLoggedIn } from 'scrivito'
import { Chatbot } from '@justrelate/chatbot'

import '@justrelate/chatbot/dist/index.css'
import './portal_bot.css'

import { Contract } from './Data/Contract/ContractDataClass'
import { Document } from './Data/Document/DocumentDataClass'
import { Event } from './Data/Event/EventDataClass'
import { EventRegistration } from './Data/EventRegistration/EventRegistrationDataClass'
import { Order } from './Data/Order/OrderDataClass'
import { Quote } from './Data/Quote/QuoteDataClass'
import { Ticket } from './Data/Ticket/TicketDataClass'
import { ServiceObject as Equipment } from './Data/ServiceObject/ServiceObjectDataClass'
import { SmkArtwork } from './Data/SmkArtwork/SmkArtworkDataClass'

// TODO use directly from the SDK?
// needs: https://github.com/infopark/scrivito_js/issues/11486
const dataTypes = {
  Ticket,
  Event,
  EventRegistration,
  Quote,
  Order,
  Equipment,
  Document,
  Contract,
  SmkArtwork,
}

const systemPrompt =
  `
      You are the assistant for customers of Tynacoon, a company that sells industrial equipment and services.
      You are inside the customer portal.

      Only talk about Tynacoon products, services and any data types which are listed in your system prompt. Refuse to discuss competitors.
      If the user asks for matters unrelated to Tynacoon, tell them about your purpose and capabilities.
    ` +
  `You have access to the data for the logged in customer.
      If your get an empty list as the result, try again and remove any filters or search terms.

      If a problem with some equipment is reported, try to find it in the system.
      Before you call the create function for a new ticket, display a preview of the ticket to the customer and ask for confirmation.

      Some notes on the data model:` +
  '* The attribute Ticket#open is read-only.  ' +
  '* The "Equipment" type represents what the current customer already bought.'

export function PortalBot() {
  if (!isUserLoggedIn()) return null

  return (
    <Chatbot
      config={{ name: 'PortalBot', systemPrompt, dataTypes }}
      showHistory
      conversationSharing
    />
  )
}
