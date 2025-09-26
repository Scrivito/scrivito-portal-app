import { ColorPicker, useColor } from 'react-color-palette'
import { canEdit, connect, isComparisonActive, uiContext } from 'scrivito'
import { ButtonWidget } from './ButtonWidgetClass'
import { useState } from 'react'

export const ButtonCustomColorPicker = connect(
  function ButtonCustomColorPicker({
    widget,
  }: {
    widget: InstanceType<typeof ButtonWidget>
  }) {
    const { theme } = uiContext() || { theme: null }
    if (!theme) return null

    const disabled = !canEdit(widget.obj()) || isComparisonActive()
    const buttonColor = widget.get('buttonColor')

    // Only show color picker when 'custom' or 'custom-outline' is selected
    if (buttonColor !== 'custom' && buttonColor !== 'custom-outline') {
      return null
    }

    return (
      <div className={`scrivito_detail_content scrivito_${theme}`}>
        <div className="scrivito_detail_label">
          <span>Custom button color</span>
        </div>
        <AdvancedColorPicker
          color={widget.get('customButtonColor') || '#274486'}
          disabled={disabled}
          setColor={(customButtonColor) => widget.update({ customButtonColor })}
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
