import { provideEditingConfig } from 'scrivito'
import { CurrentUser } from './CurrentUserDataItem'

provideEditingConfig(CurrentUser, {
  title: 'Current user',
})
