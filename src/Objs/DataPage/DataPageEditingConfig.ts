import * as Scrivito from 'scrivito'
import { DataPage } from './DataPageObjClass'

Scrivito.provideEditingConfig(DataPage, {
  title: 'Data Page',
  description: 'Represents a data obj',

  attributes: {
    dataClass: {
      title: 'Data class',
    },
    showTopContentSection: {
      title: 'Show top content section?',
      description:
        'This section will be visible before the regular content and a potential sub-navigation',
    },
  },

  properties: [
    'dataClass',
    'title',
    'hideInNavigation',
    'showTopContentSection',
  ],

  validations: [
    [
      'dataClass',
      (dataClass) => {
        if (!dataClass) return 'Data class must be specified'
      },
    ],
  ],
})
