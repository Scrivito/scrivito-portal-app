import { provideEditingConfig } from 'scrivito'
import { Opportunity } from './OpportunityDataClass'

provideEditingConfig(Opportunity, {
  title: 'Opportunity',
  attributes: {
    keyword: { title: 'Keyword' },
    description: { title: 'Description' },
  },
})
