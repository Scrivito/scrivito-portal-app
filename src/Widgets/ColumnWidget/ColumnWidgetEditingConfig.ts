import { provideEditingConfig } from 'scrivito'
import { ColumnWidget } from './ColumnWidgetClass'
import { classNameToThumbnail } from '../../utils/classNameToThumbnail'

provideEditingConfig(ColumnWidget, {
  title: 'Column',
  thumbnail: classNameToThumbnail('ColumnWidget'),
  hideInSelectionDialogs: true,
})
