import { provideEditingConfig } from 'scrivito'
import { GroupWidget } from './GroupWidgetClass'
import { classNameToThumbnail } from '../../utils/classNameToThumbnail'

provideEditingConfig(GroupWidget, {
  title: 'Group',
  thumbnail: classNameToThumbnail('GroupWidget'),
})
