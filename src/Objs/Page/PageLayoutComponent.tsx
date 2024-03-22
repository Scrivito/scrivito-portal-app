import { CurrentPage, provideLayoutComponent } from 'scrivito'
import { Page } from './PageObjClass'

provideLayoutComponent(Page, () => {
  return <CurrentPage />
})
