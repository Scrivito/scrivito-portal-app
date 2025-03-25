import { NavDropdown } from 'react-bootstrap'
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
import { HomepageInstance } from '../../../Objs/Homepage/HomepageObjClass'

export const LanguageSwitch = connect(function LanguageSwitch({
  align,
  onlyCurrentPageVersions,
}: {
  align: 'start' | 'end'
  onlyCurrentPageVersions?: boolean
}) {
  const allVersions = Obj.root()
    ?.versionsOnAllSites()
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
  if (!allVersions) return null

  const versions = onlyCurrentPageVersions
    ? allVersions.filter(({ version }) => version)
    : allVersions

  if (versions.length < 2 && !onlyCurrentPageVersions) return null

  const activeSite = (
    versions.find(({ root }) => root.siteId() === currentSiteId()) ||
    versions[0]
  )?.root

  if (!activeSite) return null

  return (
    <InPlaceEditingOff>
      <NavDropdown
        title={<LanguageLabel root={activeSite} textClassName="d-none" />}
        align={align}
      >
        {versions.map(({ version, root }) => (
          <NavDropdown.Item
            key={root.id()}
            as={LinkTag}
            to={version || root}
            params={currentPageParams()}
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
  textClassName: textClassName,
  root,
}: {
  textClassName?: string
  root: HomepageInstance
}) {
  const language = root.language()
  const label = displayName(language)

  return (
    <span aria-label={label} lang={language || undefined}>
      <ImageTag
        alt=""
        content={root}
        attribute="siteLanguageIcon"
        className="img-flag"
      />
      <span className={textClassName}>{label}</span>
    </span>
  )
})

function displayName(language: string | null) {
  const locale = language || 'en'
  return (
    new Intl.DisplayNames([locale], { type: 'language' }).of(locale) || locale
  )
}
