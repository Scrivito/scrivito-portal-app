import * as Scrivito from 'scrivito'
import { DataPage } from './DataPageObjClass'

Scrivito.provideEditingConfig(DataPage, {
  title: 'Data Page',
  description: 'Represents a data obj',

  attributes: {
    dataClass: {
      title: 'Data class',
    },
  },

  properties: ['dataClass', 'title', 'hideInNavigation'],

  validations: [
    [
      'dataClass',
      (dataClass) => {
        if (!dataClass) return 'Data class must be specified'
      },
    ],
  ],
})
