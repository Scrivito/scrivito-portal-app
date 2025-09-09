import { provideObjClass } from 'scrivito'

export const LoadProperties = provideObjClass('LoadProperties', {
  attributes: {
    someStringAttr: 'string',
    conditionalAttr: 'string',
  },
})
