import { provideEditingConfig } from 'scrivito'
import { Opportunity } from './OpportunityDataClass'

provideEditingConfig(Opportunity, {
  title: 'Opportunity',
  attributes: {
    // TODO: Remove the following attributes, once #11338 is resolved:
    description: { title: 'Description' },
    keyword: { title: 'Keyword' },
  },
})
