import {
  connect,
  CurrentPage,
  currentPage,
  Obj,
  provideLayoutComponent,
} from 'scrivito'
import { Homepage, HomepageInstance } from './HomepageObjClass'
import { DefaultPageLayoutComponent } from '../defaultPageLayoutComponent'
import { Loading } from '../../Components/Loading'

provideLayoutComponent(Homepage, ({ page }) => <HomepageLayout page={page} />)

// TODO: Remove workaround for issue #11635 once it is fixed.
const HomepageLayout = connect(
  function HomepageLayout({ page }: { page: HomepageInstance }) {
    if (ignoreTopLevelLayout()) return <CurrentPage />

    return <DefaultPageLayoutComponent page={page} />
  },
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
