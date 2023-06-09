import * as Scrivito from 'scrivito'
import { SubnavigationOverview } from './SubnavigationOverviewObjClass'

Scrivito.provideEditingConfig(SubnavigationOverview, {
  title: 'Subnavigation overview',
  attributes: {
    hideInNavigation: {
      title: 'Hide in navigation?',
      description: 'Default: No',
    },
    title: { title: 'Title' },
  },
  properties: ['title', 'hideInNavigation'],
})
