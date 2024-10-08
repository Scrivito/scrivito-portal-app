import { provideEditingConfig } from 'scrivito'
import { Quote } from './QuoteDataClass'

provideEditingConfig(Quote, {
  title: 'Quote',
  attributes: {
    commercialAgent: { title: 'Commercial agent ID' },
    technicalAgent: { title: 'Technical agent ID' },
  },
})
