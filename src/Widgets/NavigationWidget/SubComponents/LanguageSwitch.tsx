import { NavDropdown } from 'react-bootstrap'
import {
  ImageTag,
  InPlaceEditingOff,
  LinkTag,
  Obj,
  connect,
  currentPage,
  currentSiteId,
} from 'scrivito'
import { HomepageInstance } from '../../../Objs/Homepage/HomepageObjClass'

export const LanguageSwitch = connect(function LanguageSwitch() {
  const versions = Obj.onAllSites()
    .where('_path', 'equals', '/')
    .toArray()
    .map((site) => {
      const siteId = site.siteId()
      const pageVersion = siteId && currentPage()?.versionOnSite(siteId)
      const language = site.language() || 'en'
      return {
        label: displayName(language),
        language,
        version: pageVersion,
        root: site as HomepageInstance,
      }
    })
    .sort((a, b) => a.label.localeCompare(b.label, 'en'))

  if (versions.length < 2) return null

  const activeSite = (
    versions.find(({ root }) => root.siteId() === currentSiteId()) ||
    versions[0]
  )?.root

  if (!activeSite) return null

  const title = <LanguageLabel root={activeSite} showIconOnly />

  return (
    <NavDropdown title={title}>
      {versions.map(({ version, root }) => (
        <NavDropdown.Item
          key={root.id()}
          as={LinkTag}
          to={version || root}
          active={root.language() === activeSite.language()}
        >
          <LanguageLabel root={root} />
        </NavDropdown.Item>
      ))}
    </NavDropdown>
  )
})

const LanguageLabel = connect(function LanguageLabel({
  root,
  showIconOnly,
}: {
  root: HomepageInstance
  showIconOnly?: boolean
}) {
  const language = root.language() || 'en'
  const label = displayName(language)

  return (
    <InPlaceEditingOff>
      <ImageTag
        alt=""
        content={root}
        attribute="siteLanguageIcon"
        className="img-flag"
        aria-hidden={showIconOnly ? undefined : true}
        aria-label={showIconOnly ? label : undefined}
      />
      <span className={showIconOnly ? 'hidden-md hidden-lg' : undefined}>
        {label}
      </span>
    </InPlaceEditingOff>
  )
})

function displayName(language: string) {
  return (
    new Intl.DisplayNames([language], { type: 'language' }).of(language) ||
    language
  )
}
