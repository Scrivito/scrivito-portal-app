import {
  CurrentPage,
  ensureUserIsLoggedIn,
  isUserLoggedIn,
  provideLayoutComponent,
} from 'scrivito'
import { Page } from './PageObjClass'

provideLayoutComponent(Page, ({ page }) => {
  if (page.get('requireUserLogin')) {
    ensureUserIsLoggedIn()

    if (!isUserLoggedIn()) {
      return (
        <div className="text-center">
          <div className="loading-placeholder" />
        </div>
      )
    }
  }

  return <CurrentPage />
})
