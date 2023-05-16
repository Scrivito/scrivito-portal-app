import * as Scrivito from 'scrivito'
import { NavigationWidget } from './NavigationWidgetClass'

Scrivito.provideEditingConfig(NavigationWidget, {
  title: 'Navigation Widget',
  properties: ['metaNavigationObjs'],
})
