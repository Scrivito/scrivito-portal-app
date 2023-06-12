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
    showTopContentSection: {
      title: 'Show top content section?',
      description:
        'This section will be visible before the regular content and a potential sub-navigation',
    },
  },
  properties: ['title', 'hideInNavigation', 'showTopContentSection'],
})
