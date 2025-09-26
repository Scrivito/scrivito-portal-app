import { ColorPicker, useColor } from 'react-color-palette'
import { canEdit, connect, isComparisonActive, uiContext } from 'scrivito'
import { SectionWidgetInstance } from './SectionWidgetClass'
import { useState } from 'react'

export const SectionBackgroundColorPicker = connect(
  function SectionBackgroundColorPicker({
    widget,
  }: {
    widget: SectionWidgetInstance
  }) {
    const { theme } = uiContext() || { theme: null }
    if (!theme) return null

    const disabled = !canEdit(widget.obj()) || isComparisonActive()
    const backgroundColor = widget.get('backgroundColor')

    // Only show color picker when 'custom' is selected
    if (backgroundColor !== 'custom') return null

    return (
      <div className={`scrivito_detail_content scrivito_${theme}`}>
        <div className="scrivito_detail_label">
          <span>Custom background color</span>
        </div>
        <AdvancedColorPicker
          color={widget.get('customBackgroundColor') || '#ffffff'}
          disabled={disabled}
          setColor={(customBackgroundColor) =>
            widget.update({ customBackgroundColor })
          }
        />
      </div>
    )
  },
)

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
