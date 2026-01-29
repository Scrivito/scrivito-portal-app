import { provideEditingConfig } from 'scrivito'
import {
  paddingEditAttributes,
  paddingGroup,
} from '../propertiesGroups/padding/paddingEditingConfig'
import { DataGroupWidget } from './DataGroupWidgetClass'
import Thumbnail from './thumbnail.svg'

provideEditingConfig(DataGroupWidget, {
  title: 'Data Group',
  thumbnail: Thumbnail,
  attributes: {
    data: {
      restrictDataTo: ['scope', 'item'],
    },
    ...paddingEditAttributes,
  },
  propertiesGroups: [paddingGroup],
})
