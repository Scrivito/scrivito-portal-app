import { NavDropdown } from 'react-bootstrap'
import {
  connect,
  currentPage,
  currentPageParams,
  currentSiteId,
  ImageTag,
  InPlaceEditingOff,
  Obj,
  urlFor,
} from 'scrivito'
import { HomepageInstance } from '../../../Objs/Homepage/HomepageObjClass'

export const LanguageSwitch = connect(function LanguageSwitch() {
  const versions = Obj.root()
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

  if (!versions || versions.length < 2) return null

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
            href={
              version
                ? urlFor(version, { query: currentQuery() })
                : urlFor(root)
            }
            active={root.language() === activeSite.language()}
          >
            <LanguageLabel root={root} />
          </NavDropdown.Item>
        ))}
      </NavDropdown>
    </InPlaceEditingOff>
  )
})

function currentQuery() {
  const params = new URLSearchParams()
  Object.entries(currentPageParams()).forEach(([k, v]) => {
    if (typeof v === 'string') params.append(k, v)
  })
  return params.toString()
}

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
