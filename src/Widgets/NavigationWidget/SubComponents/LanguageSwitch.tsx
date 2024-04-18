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
      return {
        label: displayName(site.language()),
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

  return (
    <InPlaceEditingOff>
      <NavDropdown
        title={
          <LanguageLabel root={activeSite} className="hidden-md hidden-lg" />
        }
      >
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
    </InPlaceEditingOff>
  )
})

const LanguageLabel = connect(function LanguageLabel({
  className,
  root,
}: {
  className?: string
  root: HomepageInstance
}) {
  return (
    <>
      <ImageTag
        alt=""
        content={root}
        attribute="siteLanguageIcon"
        className="img-flag"
      />
      <span className={className}>{displayName(root.language())}</span>
    </>
  )
})

function displayName(language: string | null) {
  const locale = language || 'en'
  return (
    new Intl.DisplayNames([locale], { type: 'language' }).of(locale) || locale
  )
}
