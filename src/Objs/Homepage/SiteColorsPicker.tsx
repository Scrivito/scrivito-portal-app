import { ColorPicker, useColor } from 'react-color-palette'
import { canEdit, connect, isComparisonActive, uiContext } from 'scrivito'
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

  const disabled = !canEdit(page) || isComparisonActive()

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
            color={page.get('siteColorPrimary') || '#274486'}
            disabled={disabled}
            setColor={(siteColorPrimary) => page.update({ siteColorPrimary })}
          />
        </div>

        <div className="col-sm-6">
          <div className="scrivito_detail_label">
            <span>Secondary color</span>
          </div>
          <AdvancedColorPicker
            color={page.get('siteColorSecondary') || '#39a9eb'}
            disabled={disabled}
            setColor={(siteColorSecondary) =>
              page.update({ siteColorSecondary })
            }
          />
        </div>
      </div>

      <div className="row">
        <div className="col-sm-4">
          <div className="scrivito_detail_label">
            <span>3rd color</span>
          </div>
          <AdvancedColorPicker
            color={page.get('siteColorThird') || '#f2f3f7'}
            disabled={disabled}
            setColor={(siteColorThird) => page.update({ siteColorThird })}
          />
        </div>

        <div className="col-sm-4">
          <div className="scrivito_detail_label">
            <span>4th color</span>
          </div>
          <AdvancedColorPicker
            color={page.get('siteColorFourth') || '#e8e8e8'}
            disabled={disabled}
            setColor={(siteColorFourth) => page.update({ siteColorFourth })}
          />
        </div>

        <div className="col-sm-4">
          <div className="scrivito_detail_label">
            <span>5th color</span>
          </div>
          <AdvancedColorPicker
            color={page.get('siteColorFifth') || '#2f2f2f'}
            disabled={disabled}
            setColor={(siteColorFifth) => page.update({ siteColorFifth })}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-sm-6">
          <div className="scrivito_detail_label">
            <span>Dark text</span>
          </div>
          <AdvancedColorPicker
            color={page.get('siteColorTextDark') || '#4f557a'}
            disabled={disabled}
            setColor={(siteColorTextDark) => page.update({ siteColorTextDark })}
          />
        </div>

        <div className="col-sm-6">
          <div className="scrivito_detail_label">
            <span>Dark headline text</span>
          </div>
          <AdvancedColorPicker
            color={page.get('siteColorTextDarkHeadline') || '#1a284d'}
            disabled={disabled}
            setColor={(siteColorTextDarkHeadline) =>
              page.update({ siteColorTextDarkHeadline })
            }
          />
        </div>
      </div>

      <div className="row">
        <div className="col-sm-6">
          <div className="scrivito_detail_label">
            <span>Light text</span>
          </div>
          <AdvancedColorPicker
            color={page.get('siteColorTextLight') || '#ffffffe6'}
            disabled={disabled}
            setColor={(siteColorTextLight) =>
              page.update({ siteColorTextLight })
            }
          />
        </div>

        <div className="col-sm-6">
          <div className="scrivito_detail_label">
            <span>Light headline text</span>
          </div>
          <AdvancedColorPicker
            color={page.get('siteColorTextLightHeadline') || '#ffffffe6'}
            disabled={disabled}
            setColor={(siteColorTextLightHeadline) =>
              page.update({ siteColorTextLightHeadline })
            }
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
