import { provideLayoutComponent } from 'scrivito'
import { Homepage } from './HomepageObjClass'
import { DefaultPageLayoutComponent } from '../defaultPageLayoutComponent'

provideLayoutComponent(Homepage, ({ page }) => {
  return <DefaultPageLayoutComponent page={page} />
})
