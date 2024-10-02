import Color from 'color'
import { ColorPicker, useColor } from 'react-color-palette'
import { canEdit, connect, uiContext } from 'scrivito'
import { HomepageInstance } from './HomepageObjClass'
import './SiteColorsPicker.scss'
import { useState } from 'react'

export const SiteColorsPicker = connect(function SiteColorsPicker({
  page,
}: {
  page: HomepageInstance
}) {
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
          <AdvancedColorPicker
            color={page.get('siteColorPrimary') || '#072b46'}
            disabled={!canEdit(page)}
            setColor={(color) => {
              page.update({
                siteColorPrimary: color,
                siteColorPrimaryDarken: darken(color),
                siteColorPrimaryLighten: lighten(color),
              })
            }}
          />
        </div>

        <div className="col-sm-6">
          <div className="scrivito_detail_label">
            <span>Secondary color</span>
          </div>
          <AdvancedColorPicker
            color={page.get('siteColorSecondary') || '#0e5588'}
            disabled={!canEdit(page)}
            setColor={(color) => {
              page.update({
                siteColorSecondary: color,
                siteColorSecondaryDarken: darken(color),
                siteColorSecondaryLighten: lighten(color),
              })
            }}
          />
        </div>
      </div>
    </div>
  )
})

function AdvancedColorPicker({
  color,
  disabled,
  setColor,
}: {
  color: string
  disabled: boolean
  setColor: (color: string) => void
}) {
  const [iColor] = useColor(color)
  const [highResIColor, setHighResIColor] = useState(iColor)

  return (
    <ColorPicker
      height={100}
      color={iColor.hex === highResIColor.hex ? highResIColor : iColor}
      disabled={disabled}
      hideInput={['hsv']}
      hideAlpha={true}
      onChange={(newIColor) => {
        setHighResIColor(newIColor)
        setColor(newIColor.hex)
      }}
    />
  )
}

function lighten(inputColor: string): string {
  const color = Color(inputColor)
  return color.lightness(color.lightness() + 8).hex()
}

function darken(inputColor: string): string {
  const color = Color(inputColor)
  return color.lightness(color.lightness() - 8).hex()
}
