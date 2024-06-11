import { provideEditingConfig } from 'scrivito'
import { OpportunityPromise } from './OpportunityDataClass'

OpportunityPromise.then((Opportunity) => {
  provideEditingConfig(Opportunity, {
    title: 'Opportunity',
    attributes: {
      keyword: { title: 'Keyword' },
      description: { title: 'Description' },
    },
  })
})
