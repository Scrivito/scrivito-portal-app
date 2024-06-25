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
  const [primaryColor, setPrimaryColor] = useColor(
    siteColorPrimary || '#274486',
  )

  const siteColorSecondary = page.get('siteColorSecondary')
  const [secondaryColor, setSecondaryColor] = useColor(
    siteColorSecondary || '#39a9eb',
  )

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
            color={primaryColor}
            hideInput={['hsv']}
            hideAlpha={true}
            onChange={(iColor) => {
              const newSiteColorPrimary = iColor.hex
              page.update({
                siteColorPrimary: newSiteColorPrimary,
                siteColorPrimaryDarken: darken(newSiteColorPrimary),
                siteColorPrimaryLighten: lighten(newSiteColorPrimary),
              })

              setPrimaryColor(iColor)
            }}
          />
        </div>

        <div className="col-sm-6">
          <div className="scrivito_detail_label">
            <span>Secondary color</span>
          </div>
          <ColorPicker
            height={100}
            color={secondaryColor}
            hideInput={['hsv']}
            hideAlpha={true}
            onChange={(iColor) => {
              const newSiteColorSecondary = iColor.hex
              page.update({
                siteColorSecondary: newSiteColorSecondary,
                siteColorSecondaryDarken: darken(newSiteColorSecondary),
                siteColorSecondaryLighten: lighten(newSiteColorSecondary),
              })

              setSecondaryColor(iColor)
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
