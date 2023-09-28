import { provideEditingConfig } from 'scrivito'
import { DividerWidget } from './DividerWidgetClass'
import { classNameToThumbnail } from '../../utils/classNameToThumbnail'

provideEditingConfig(DividerWidget, {
  title: 'Divider',
  thumbnail: classNameToThumbnail('DividerWidget'),
})
