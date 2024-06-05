import {
  connect,
  isCurrentPage,
  LinkTag,
  ContentTag,
  Obj,
  logout,
  isUserLoggedIn,
  isEditorLoggedIn,
} from 'scrivito'
import { NavigationWidgetInstance } from '../NavigationWidgetClass'
import NavDropdown from 'react-bootstrap/NavDropdown'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import { ObjIconAndTitle } from '../../../Components/ObjIconAndTitle'
import { CurrentUser } from '../../../Data/CurrentUser/CurrentUserDataItem'
import { ensureString } from '../../../utils/ensureString'
import { HomepageInstance } from '../../../Objs/Homepage/HomepageObjClass'
import personCircle from '../../../assets/images/person-circle.svg'
import { Loading } from '../../../Components/Loading'

export const CurrentUserDropdown = connect(function CurrentUserDropdown({
  root,
  widget,
}: {
  root: HomepageInstance
  widget: NavigationWidgetInstance
}) {
  if (!isUserLoggedIn()) return null

  const siteUserProfilePage = root.get('siteUserProfilePage')
  const showUserProfileLink = !!siteUserProfilePage

  return (
    <NavDropdown
      title={
        <>
          <ProfileImg />
          <span className="nav-link-extended">
            <ContentTag
              content={widget}
              attribute="metaNavigationUserTitle"
              tag="span"
            />

            <ContentTag
              content={widget}
              attribute="metaNavigationUserDescription"
              tag="span"
              className="text-meta"
            />
          </span>
        </>
      }
    >
      {showUserProfileLink ? (
        <>
          <NavDropdown.Item
            active={isCurrentPage(siteUserProfilePage)}
            as={LinkTag}
            eventKey={`MetaNavigation-${siteUserProfilePage.id()}`}
            key={`MetaNavigation-${siteUserProfilePage.id()}`}
            to={siteUserProfilePage}
          >
            <ObjIconAndTitle obj={siteUserProfilePage} />
          </NavDropdown.Item>
          <li>
            <hr className="dropdown-divider" />
          </li>
        </>
      ) : null}

      <LogOutButton logOutLabel={widget.get('logOutLabel')} />
    </NavDropdown>
  )
})

const LogOutButton = connect(function LogOutButton({
  logOutLabel,
}: {
  logOutLabel: string
}) {
  // TODO: Remove workaround, once #10276 is available
  if (isEditorLoggedIn()) {
    return (
      <OverlayTrigger
        placement="left"
        overlay={
          <Tooltip>
            Logging out from an app inside the Scrivito UI is currently not
            possible.
          </Tooltip>
        }
      >
        <div>
          <NavDropdown.Item
            eventKey="MetaNavigation-LogOut"
            key="MetaNavigation-LogOut"
            disabled
          >
            <i className={'bi bi-box-arrow-right'}></i>
            {logOutLabel}
          </NavDropdown.Item>
        </div>
      </OverlayTrigger>
    )
  }

  return (
    <NavDropdown.Item
      as={LinkTag}
      eventKey="MetaNavigation-LogOut"
      key="MetaNavigation-LogOut"
      onClick={() => {
        logout()
      }}
      to={Obj.root()}
    >
      <i className={'bi bi-box-arrow-right'}></i>
      {logOutLabel}
    </NavDropdown.Item>
  )
})

const ProfileImg = connect(
  function ProfileImg() {
    const picture = ensureString(CurrentUser.get('picture')) || personCircle

    return (
      <>
        <img className="profile-img" src={picture} aria-hidden="true" />{' '}
      </>
    )
  },
  { loading: Loading },
)
