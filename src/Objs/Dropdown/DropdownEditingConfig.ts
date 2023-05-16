import * as Scrivito from 'scrivito'
import { Dropdown } from './DropdownObjClass'

Scrivito.provideEditingConfig(Dropdown, {
  title: 'Dropdown',
  properties: ['title', 'hideFromNavigation'],
})
