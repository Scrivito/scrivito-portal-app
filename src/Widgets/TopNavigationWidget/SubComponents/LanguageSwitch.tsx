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

      return {
        label: displayName(root.language()),
        language: root.language() || undefined,
        root,
        siteId,
        version: currentPage()?.versionOnSite(siteId),
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
      <NavDropdown
        title={
          <LanguageLabel
            label={currentVersion.label}
            language={currentVersion.language}
            root={currentVersion.root}
          />
        }
        align={align}
      >
        {versions.map(({ version, root, label, language }) => (
          <NavDropdown.Item
            key={root.id()}
            as={LinkTag}
            to={version || root}
            params={currentPageParams()}
            active={root.language() === currentVersion.language}
          >
            <LanguageLabel
              label={label}
              language={language}
              root={root}
              showTextLabel
            />
          </NavDropdown.Item>
        ))}
      </NavDropdown>
    </InPlaceEditingOff>
  )
})

const LanguageLabel = connect(function LanguageLabel({
  label,
  language,
  root,
  showTextLabel,
}: {
  label: string
  language: string | undefined
  root: HomepageInstance
  showTextLabel?: boolean
}) {
  return (
    <span aria-label={label} lang={language}>
      <ImageTag
        alt=""
        content={root}
        attribute="siteLanguageIcon"
        className="img-flag"
      />
      {showTextLabel ? <span className="text-capitalize">{label}</span> : null}
    </span>
  )
})

function displayName(language: string | null) {
  const locale = language || 'en'

  return (
    new Intl.DisplayNames([locale], { type: 'language' }).of(locale) || locale
  )
}
