import { Dropdown, NavLink } from 'react-bootstrap'
import {
  connect,
  currentPage,
  currentPageParams,
  currentSiteId,
  ImageTag,
  InPlaceEditingOff,
  LinkTag,
  Obj,
} from 'scrivito'
import {
  HomepageInstance,
  isHomepage,
} from '../../../Objs/Homepage/HomepageObjClass'

export const LanguageSwitch = connect(function LanguageSwitch({
  align,
  onlyCurrentPageVersions,
}: {
  align: 'start' | 'end'
  onlyCurrentPageVersions?: boolean
}) {
  const currentVersionSiteId = currentSiteId()
  if (!currentVersionSiteId) return null

  const versionsSource = onlyCurrentPageVersions ? currentPage() : Obj.root()
  if (!versionsSource) return null

  const versions = versionsSource
    .versionsOnAllSites()
    .map((obj) => {
      const siteId = obj.siteId()
      if (!siteId) return null

      const root = Obj.onSite(siteId).root()
      if (!isHomepage(root)) return null

      const version = currentPage()
        ?.versionsOnAllSites()
        ?.find((currentPageVersion) => currentPageVersion.siteId() === siteId)

      return {
        label: displayName(root.language()),
        language: root.language() || undefined,
        root,
        siteId,
        version,
      }
    })
    .filter((v) => v !== null)
    .sort((a, b) => a.label.localeCompare(b.label, 'en'))

  if (versions.length < 2 && !onlyCurrentPageVersions) return null

  const currentVersion = versions.find(
    ({ siteId }) => siteId === currentVersionSiteId,
  )
  if (!currentVersion) return null

  return (
    <InPlaceEditingOff>
      <Dropdown className="nav-item">
        <Dropdown.Toggle
          active={false}
          aria-label={currentVersion.label}
          as={NavLink}
          eventKey={null}
          lang={currentVersion.language}
        >
          <LanguageLabel
            label={currentVersion.label}
            root={currentVersion.root}
          />
        </Dropdown.Toggle>
        <Dropdown.Menu align={align}>
          {versions.map(({ version, root, label, language }) => (
            <Dropdown.Item
              key={root.id()}
              active={root.language() === currentVersion.language}
              aria-label={label}
              as={LinkTag}
              lang={language}
              params={currentPageParams()}
              to={version || root}
            >
              <LanguageLabel label={label} root={root} showTextLabel />
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </InPlaceEditingOff>
  )
})

const LanguageLabel = connect(function LanguageLabel({
  label,
  root,
  showTextLabel,
}: {
  label: string
  root: HomepageInstance
  showTextLabel?: boolean
}) {
  return (
    <>
      <ImageTag
        alt=""
        content={root}
        attribute="siteLanguageIcon"
        className="img-flag"
      />
      {showTextLabel ? <span className="text-capitalize">{label}</span> : null}
    </>
  )
})

function displayName(language: string | null) {
  const locale = language || 'en'

  return (
    new Intl.DisplayNames([locale], { type: 'language' }).of(locale) || locale
  )
}
