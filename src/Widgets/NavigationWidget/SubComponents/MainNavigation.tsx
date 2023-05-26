import * as Scrivito from 'scrivito'
import { NavItem as NavItem } from './NavItem'

export const MainNavigation = Scrivito.connect(function MainNavigation({
  root,
}: {
  root: Scrivito.Obj
}) {
  return (
    <div className="navbar-main">
      <Scrivito.ChildListTag
        className="navbar-nav me-auto mb-2 mb-lg-0"
        tag="div"
        parent={root}
        renderChild={(child) => <NavItem obj={child} />}
      />
    </div>
  )
})
