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
    if (ignoreHomepageLayout()) return <CurrentPage />

    return <DefaultPageLayoutComponent page={page} />
  },
  { loading: Loading },
)

function ignoreHomepageLayout(): boolean {
  const firstSubpagePath = currentPage()
    ?.path()
    ?.split('/')
    .slice(0, 2)
    .join('/')
  if (!firstSubpagePath) return false
  if (firstSubpagePath === '/') return false

  const firstSubpage = Obj.getByPath(firstSubpagePath)
  if (!firstSubpage) return false

  return firstSubpage.get('layoutIgnoreHomepageLayout') === true
}
