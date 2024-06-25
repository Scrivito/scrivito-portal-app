import Color from 'color'
import { ColorPicker, useColor } from 'react-color-palette'
import { connect, uiContext } from 'scrivito'
import { HomepageInstance } from './HomepageObjClass'
import './SiteColorsPicker.scss'

export const SiteColorsPicker = connect(function SiteColorsPicker({
  page,
}: {
  page: HomepageInstance
}) {
  const siteColorPrimary = page.get('siteColorPrimary')
  const [iColorPrimary] = useColor(siteColorPrimary || '#274486')

  const siteColorSecondary = page.get('siteColorSecondary')
  const [iColorSecondary] = useColor(siteColorSecondary || '#39a9eb')

  const { theme } = uiContext() || { theme: null }
  if (!theme) return null

  return (
    <div
      className={`site-colors-picker scrivito_detail_content scrivito_${theme}`}
    >
      <div className="row">
        <div className="col-sm-6">
          <div className="scrivito_detail_label">
            <span>Primary color</span>
          </div>
          <ColorPicker
            height={100}
            color={iColorPrimary}
            hideInput={['hsv']}
            hideAlpha={true}
            onChange={(iColor) => {
              const newSiteColorPrimary = iColor.hex
              page.update({
                siteColorPrimary: newSiteColorPrimary,
                siteColorPrimaryDarken: darken(newSiteColorPrimary),
                siteColorPrimaryLighten: lighten(newSiteColorPrimary),
              })
            }}
          />
        </div>

        <div className="col-sm-6">
          <div className="scrivito_detail_label">
            <span>Secondary color</span>
          </div>
          <ColorPicker
            height={100}
            color={iColorSecondary}
            hideInput={['hsv']}
            hideAlpha={true}
            onChange={(iColor) => {
              const newSiteColorSecondary = iColor.hex
              page.update({
                siteColorSecondary: newSiteColorSecondary,
                siteColorSecondaryDarken: darken(newSiteColorSecondary),
                siteColorSecondaryLighten: lighten(newSiteColorSecondary),
              })
            }}
          />
        </div>
      </div>
    </div>
  )
})

function lighten(color: string): string {
  return Color(color).lighten(0.5).hex()
}

function darken(color: string): string {
  return Color(color).darken(0.5).hex()
}
