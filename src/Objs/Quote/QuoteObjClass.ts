import * as Scrivito from 'scrivito'

export const Quote = Scrivito.provideObjClass('Quote', {
  attributes: {
    comments: 'string',
    content: 'string',
    createdAt: 'string',
    customerId: 'string',
    payment: 'string',
    quoteId: 'string',
    status: 'string',
    termsAndConditions: 'string',
    total: 'string',
    validUntil: 'string',
  },
})
