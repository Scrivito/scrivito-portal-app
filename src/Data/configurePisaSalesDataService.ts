import { DataClass, provideDataClass, provideDataService } from 'scrivito'
import { pisaConfig } from './pisaClient'

export async function configurePisaSalesDataService(): Promise<DataClass[]> {
  const config = await pisaConfig('portal')
  if (!config) return dataServiceFallback()

  return provideDataService(config.url, { headers: config.headers })
}

async function dataServiceFallback(): Promise<DataClass[]> {
  const Contract = provideDataClass('Contract', async () => {
    return (
      await import('./Contract/contractParamsFallback')
    ).contractParamsFallback()
  })

  const ContractDocument = provideDataClass('ContractDocument', async () => {
    return (
      await import('./ContractDocument/contractDocumentParamsFallback')
    ).contractDocumentParamsFallback()
  })

  const Country = provideDataClass('Country', async () => {
    return (
      await import('./Country/countryParamsFallback')
    ).countryParamsFallback()
  })

  const Document = provideDataClass('Document', async () => {
    return (
      await import('./Document/documentParamsFallback')
    ).documentParamsFallback()
  })

  const Event = provideDataClass('Event', async () => {
    return (await import('./Event/eventParamsFallback')).eventParamsFallback()
  })

  const EventDocument = provideDataClass('EventDocument', async () => {
    return (
      await import('./EventDocument/eventDocumentParamsFallback')
    ).eventDocumentParamsFallback()
  })

  const EventRegistration = provideDataClass('EventRegistration', async () => {
    return (
      await import('./EventRegistration/eventRegistrationParamsFallback')
    ).eventRegistrationParamsFallback()
  })

  const Faq = provideDataClass('Faq', async () => {
    return (await import('./Faq/faqParamsFallback')).faqParamsFallback()
  })

  // Gdpr is not included here, since it additionally uses JWT-based auth.

  const Message = provideDataClass('Message', async () => {
    return (
      await import('./Message/messageParamsFallback')
    ).messageParamsFallback()
  })

  const Opportunity = provideDataClass('Opportunity', async () => {
    return (
      await import('./Opportunity/opportunityParamsFallback')
    ).opportunityParamsFallback()
  })

  const Order = provideDataClass('Order', async () => {
    return (await import('./Order/orderParamsFallback')).orderParamsFallback()
  })

  const OrderDocument = provideDataClass('OrderDocument', async () => {
    return (
      await import('./OrderDocument/orderDocumentParamsFallback')
    ).orderDocumentParamsFallback()
  })

  const OrderRequest = provideDataClass('OrderRequest', async () => {
    return (
      await import('./OrderRequest/orderRequestParamsFallback')
    ).orderRequestParamsFallback()
  })

  const Quote = provideDataClass('Quote', async () => {
    return (await import('./Quote/quoteParamsFallback')).quoteParamsFallback()
  })

  const QuoteDocument = provideDataClass('QuoteDocument', async () => {
    return (
      await import('./QuoteDocument/quoteDocumentParamsFallback')
    ).quoteDocumentParamsFallback()
  })

  const ServiceObject = provideDataClass('ServiceObject', async () => {
    return (
      await import('./ServiceObject/serviceObjectParamsFallback')
    ).serviceObjectParamsFallback()
  })

  const ServiceObjectDocument = provideDataClass(
    'ServiceObjectDocument',
    async () => {
      return (
        await import('./ServiceObjectDocument/serviceObjectDocumentParamsFallback')
      ).serviceObjectDocumentParamsFallback()
    },
  )

  const Ticket = provideDataClass('Ticket', async () => {
    return (
      await import('./Ticket/ticketParamsFallback')
    ).ticketParamsFallback()
  })

  return [
    Contract,
    ContractDocument,
    Country,
    Document,
    Event,
    EventDocument,
    EventRegistration,
    Faq,
    Message,
    Opportunity,
    Order,
    OrderDocument,
    OrderRequest,
    Quote,
    QuoteDocument,
    ServiceObject,
    ServiceObjectDocument,
    Ticket,
  ]
}
