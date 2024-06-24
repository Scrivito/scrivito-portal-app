import Color from 'color'
import { ColorPicker, useColor } from 'react-color-palette'
import { connect, uiContext } from 'scrivito'
import { HomepageInstance } from '../Objs/Homepage/HomepageObjClass'
import './SiteColorsPicker.scss'

export const SiteColorsPicker = connect(function SiteColorsPicker({
  page,
}: {
  page: HomepageInstance
}) {
  const initialSiteColorPrimary = page.get('siteColorPrimary')
  const [primaryColor, setPrimaryColor] = useColor(
    initialSiteColorPrimary || '#274486',
  )

  const initialSiteColorSecondary = page.get('siteColorSecondary')
  const [secondaryColor, setSecondaryColor] = useColor(
    initialSiteColorSecondary || '#39a9eb',
  )

  const { theme } = uiContext() || { theme: null }
  if (!theme) return null
  return (
    <div
      className={`site-colors-picker scrivito_detail_content scrivito_${theme}`}
    >
      <div>
        <div className="scrivito_detail_label">
          <span>Primary color</span>
        </div>
        <ColorPicker
          height={100}
          color={primaryColor}
          hideInput={['hsv']}
          hideAlpha={true}
          onChange={(iColor) => {
            const siteColorPrimary = iColor.hex
            page.update({
              siteColorPrimary,
              siteColorPrimaryDarken: darken(siteColorPrimary),
              siteColorPrimaryLighten: lighten(siteColorPrimary),
            })

            setPrimaryColor(iColor)
          }}
        />
      </div>

      <div>
        <div className="scrivito_detail_label mt-2">
          <span>Secondary color</span>
        </div>
        <ColorPicker
          height={100}
          color={secondaryColor}
          hideInput={['hsv']}
          hideAlpha={true}
          onChange={(iColor) => {
            const siteColorSecondary = iColor.hex
            page.update({
              siteColorSecondary,
              siteColorSecondaryDarken: darken(siteColorSecondary),
              siteColorSecondaryLighten: lighten(siteColorSecondary),
            })

            setSecondaryColor(iColor)
          }}
        />
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
