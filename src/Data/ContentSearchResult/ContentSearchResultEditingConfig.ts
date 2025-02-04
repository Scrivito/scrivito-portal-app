import { provideEditingConfig } from 'scrivito'
import { ContentSearchResult } from './ContentSearchResultDataClass'

provideEditingConfig(ContentSearchResult, {
  attributes: {
    image: { title: 'image' },
  },
})
