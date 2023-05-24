import * as Scrivito from 'scrivito'
import { ColumnWidget } from './ColumnWidgetClass'

Scrivito.provideEditingConfig(ColumnWidget, {
  title: 'Column',
  hideInSelectionDialogs: true,
})
