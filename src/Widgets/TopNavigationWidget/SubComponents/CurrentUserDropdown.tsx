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
import messages from './i18n.visitor.json'
import rosetta from 'rosetta'

const i18n = rosetta(messages)
const lang = currentLanguage() ?? 'en'
i18n.locale(lang in messages ? lang : 'en')

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
            {i18n.t('logOut')}
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
      {i18n.t('logOut')}
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
