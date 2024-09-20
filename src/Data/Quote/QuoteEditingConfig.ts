import { provideEditingConfig } from 'scrivito'
import { Quote } from './QuoteDataClass'

provideEditingConfig(Quote, {
  title: 'Quote',
  attributes: {
    commercialAgent: { title: 'Commercial agent ID' },
    open: { title: 'Open?' },
    technicalAgent: { title: 'Technical agent ID' },
  },
})
