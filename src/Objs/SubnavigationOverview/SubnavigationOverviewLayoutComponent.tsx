import {
  ChildListTag,
  connect,
  ContentTag,
  currentPage,
  CurrentPage,
  ensureUserIsLoggedIn,
  ImageTag,
  InPlaceEditingOff,
  isCurrentPage,
  isOnCurrentPath,
  isUserLoggedIn,
  LinkTag,
  Obj,
  provideLayoutComponent,
} from 'scrivito'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { SubnavigationOverview } from './SubnavigationOverviewObjClass'
import { ObjIconAndTitle } from '../../Components/ObjIconAndTitle'
import { Breadcrumb } from '../../Components/Breadcrumb'

provideLayoutComponent(SubnavigationOverview, ({ page }) => {
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

  return (
    <>
      <section className="bg-secondary py-5">
        <InPlaceEditingOff>
          <ImageTag
            content={page}
            attribute="topBannerBackground"
            className="img-background"
          />
        </InPlaceEditingOff>
        <div className="container">
          <div className="header-caption">
            <h3 className="h3">
              <ContentTag
                content={currentPage()}
                attribute="title"
                tag="span"
                className="bg-primary"
              />
            </h3>
          </div>
        </div>
      </section>
      <section className="bg-light-grey py-2 hidden-xs">
        <div className="container">
          <Breadcrumb />
        </div>
      </section>
      <section className="py-2 bg-light-grey">
        <div className="container">
          <div className="row">
            <div className="col-lg-2">
              <Subnavigation page={page} />
            </div>

            <div className="col-lg-10">
              <CurrentPage />
            </div>
          </div>
        </div>
      </section>
    </>
  )
})

const Subnavigation = connect(function Subnavigation({ page }: { page: Obj }) {
  return (
    <Navbar expand="lg" collapseOnSelect>
      <div>
        <Navbar.Toggle className="btn mb-3 w-100">
          <span className="d-flex px-2 justify-content-between align-items-center w-100">
            <span>Menu</span>
            <span className="navbar-toggler-default">
              <i className="bi-list"></i>
            </span>
            <span className="navbar-toggler-toggled">
              <i className="bi-x"></i>
            </span>
          </span>
        </Navbar.Toggle>
      </div>
      <Navbar.Collapse id="nav-sidebar" className="card mb-3">
        <ul
          className="nav-bordered"
          // TODO: Make official styling & make it work in mobile as well
          style={{ margin: '0', borderBottom: '1px solid var(--border)' }}
        >
          <li className={isCurrentPage(page) ? 'active' : ''}>
            <Nav.Link
              as={LinkTag}
              eventKey={`Subnavigation-${page.id()}`}
              key={`Subnavigation-${page.id()}`}
              to={page}
            >
              <ObjIconAndTitle obj={page} />
            </Nav.Link>
          </li>
        </ul>
        <ChildListTag
          className="nav-bordered"
          tag="ul"
          parent={page}
          renderChild={(child) => (
            <li className={isOnCurrentPath(child) ? 'active' : ''}>
              <Nav.Link
                as={LinkTag}
                eventKey={`Subnavigation-${page.id()}-${child.id()}`}
                key={`Subnavigation-${page.id()}-${child.id()}`}
                to={child}
              >
                <ObjIconAndTitle obj={child} />
              </Nav.Link>
            </li>
          )}
        />
      </Navbar.Collapse>
    </Navbar>
  )
})
