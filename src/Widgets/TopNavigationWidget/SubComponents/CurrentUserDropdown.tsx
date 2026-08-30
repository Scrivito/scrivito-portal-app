import {
  connect,
  ContentTag,
  currentLanguage,
  isCurrentPage,
  isEditorLoggedIn,
  isUserLoggedIn,
  LinkTag,
  logout,
  urlFor,
} from 'scrivito'
import { TopNavigationWidgetInstance } from '../TopNavigationWidgetClass'
import { NavDropdown, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { ObjIconAndTitle } from '../../../Components/ObjIconAndTitle'
import { CurrentUser } from '../../../Data/CurrentUser/CurrentUserDataItem'
import { ensureString } from '../../../utils/ensureString'
import { HomepageInstance } from '../../../Objs/Homepage/HomepageObjClass'
import personCircle from '../../../assets/images/person-circle.svg'
import { Loading } from '../../../Components/Loading'
import { RetryingImage } from '../../../Components/RetryingImage'

export const CurrentUserDropdown = connect(function CurrentUserDropdown({
  root,
  widget,
}: {
  root: HomepageInstance
  widget: TopNavigationWidgetInstance
}) {
  if (!isUserLoggedIn()) return null

  const siteUserProfilePage = root.get('siteUserProfilePage')
  const showUserProfileLink = !!siteUserProfilePage

  return (
    <NavDropdown
      className="whitespace-nowrap"
      title={
        <>
          <ProfileImg />
          <span className="nav-link-extended -my-4 inline-block h-9 overflow-hidden">
            <ContentTag
              content={widget}
              attribute="metaNavigationUserTitle"
              tag="span"
              className="block leading-[18px]"
            />

            <ContentTag
              content={widget}
              attribute="metaNavigationUserDescription"
              tag="span"
              className="text-meta block text-[9px] leading-[12px]"
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
            <hr className="border-portal-middle-grey m-0 h-0 overflow-hidden border-t opacity-100" />
          </li>
        </>
      ) : null}

      <LogOutButton root={root} />
    </NavDropdown>
  )
})

const LogOutButton = connect(function LogOutButton({
  root,
}: {
  root: HomepageInstance
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
            style={{ color: 'rgba(0, 0, 0, 0.5)' }}
          >
            <i className="bi bi-box-arrow-right"></i>
            {localizeLogOutLabel()}
          </NavDropdown.Item>
        </div>
      </OverlayTrigger>
    )
  }

  const rootUrl = urlFor(root)

  return (
    <NavDropdown.Item
      eventKey="MetaNavigation-LogOut"
      key="MetaNavigation-LogOut"
      onClick={() => logout(rootUrl)}
    >
      <i className="bi bi-box-arrow-right"></i>
      {localizeLogOutLabel()}
    </NavDropdown.Item>
  )
})

const ProfileImg = connect(
  function ProfileImg() {
    const picture = ensureString(CurrentUser.get('picture')) || personCircle

    return (
      <>
        <RetryingImage alt="" className="profile-img" src={picture} />{' '}
      </>
    )
  },
  { loading: Loading },
)

function localizeLogOutLabel(): string {
  switch (currentLanguage()) {
    case 'de':
      return 'Abmelden'
    case 'fr':
      return 'Se déconnecter'
    case 'pl':
      return 'Wyloguj się'
    default:
      return 'Log out'
  }
}
