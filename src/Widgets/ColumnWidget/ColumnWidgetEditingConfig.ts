import { provideEditingConfig } from 'scrivito'
import { ColumnWidget } from './ColumnWidgetClass'

provideEditingConfig(ColumnWidget, {
  title: 'Column',
  hideInSelectionDialogs: true,
})
