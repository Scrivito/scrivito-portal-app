import { CurrentPage, currentPage, Obj, provideLayoutComponent } from 'scrivito'
import { Homepage } from './HomepageObjClass'
import { DefaultPageLayoutComponent } from '../defaultPageLayoutComponent'
import { Loading } from '../../Components/Loading'

provideLayoutComponent(
  Homepage,
  ({ page }) =>
    ignoreTopLevelLayout() ? (
      <CurrentPage />
    ) : (
      <DefaultPageLayoutComponent page={page} />
    ),
  { loading: Loading },
)

function ignoreTopLevelLayout(): boolean {
  return getHomepageSubpage()?.get('layoutIgnoreTopLevelLayout') === true
}

function getHomepageSubpage(): Obj | null {
  const homepageSubpagePath = currentPage()
    ?.path()
    ?.split('/')
    .slice(0, 2)
    .join('/')
  if (!homepageSubpagePath) return null
  if (homepageSubpagePath === '/') return null

  return Obj.getByPath(homepageSubpagePath)
}
