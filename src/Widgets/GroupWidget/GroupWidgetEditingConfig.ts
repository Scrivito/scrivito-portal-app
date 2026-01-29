import { provideEditingConfig } from 'scrivito'
import {
  paddingEditAttributes,
  paddingGroup,
} from '../propertiesGroups/padding/paddingEditingConfig'
import { GroupWidget } from './GroupWidgetClass'
import Thumbnail from './thumbnail.svg'

provideEditingConfig(GroupWidget, {
  title: 'Group',
  thumbnail: Thumbnail,
  attributes: {
    ...paddingEditAttributes,
  },
  propertiesGroups: [paddingGroup],
})
