import {
  canEdit,
  connect,
  isComparisonActive,
  Widget,
  uiContext,
} from 'scrivito'
import { paddingAttributes } from './paddingAttributes'
import { DimensionEditor } from './DimensionEditor'
import './PaddingEditor.scss'
import { useEffect, useState } from 'react'

export const PaddingEditor = connect(function PaddingEditor({
  widget,
}: {
  widget: Widget<typeof paddingAttributes>
}) {
  const { theme } = uiContext() || { theme: null }
  const top = widget.get('paddingTop')
  const right = widget.get('paddingRight')
  const bottom = widget.get('paddingBottom')
  const left = widget.get('paddingLeft')

  const [topNumeric, topUnit] = parseStringValue(top, ['px', '%'])
  const [bottomNumeric, bottomUnit] = parseStringValue(bottom, ['px', '%'])
  const [verticalUnit, setVerticalUnit] = useState(
    topNumeric !== null ? topUnit : bottomUnit,
  )
  useEffect(() => {
    if (topNumeric !== null) return setVerticalUnit(topUnit)
    if (bottomNumeric !== null) setVerticalUnit(bottomUnit)
  }, [topNumeric, topUnit, bottomNumeric, bottomUnit])

  const [leftNumeric, leftUnit] = parseStringValue(left, ['px', '%'])
  const [rightNumeric, rightUnit] = parseStringValue(right, ['px', '%'])
  const [horizontalUnit, setHorizontalUnit] = useState(
    leftNumeric !== null ? leftUnit : rightUnit,
  )
  useEffect(() => {
    if (leftNumeric !== null) return setHorizontalUnit(leftUnit)
    if (rightNumeric !== null) setHorizontalUnit(rightUnit)
  }, [leftNumeric, leftUnit, rightNumeric, rightUnit])

  if (!theme) return null

  const readOnly = !canEdit(widget.obj()) || isComparisonActive()

  return (
    <div className={`padding-editor ${theme}`}>
      <div className="fields">
        <div className="field top">
          <DimensionEditor
            numericValue={topNumeric}
            unit={verticalUnit}
            onValueChange={(value) => {
              widget.update({ paddingTop: formatValue(value, verticalUnit) })
            }}
            onUnitChange={(newUnit) => {
              setVerticalUnit(newUnit)

              widget.update({
                paddingBottom: formatValue(bottomNumeric, newUnit),
                paddingTop: formatValue(topNumeric, newUnit),
              })
            }}
            units={['px', '%']}
            readOnly={readOnly}
            placeholder=""
          />
        </div>

        <div className="field left">
          <DimensionEditor
            numericValue={leftNumeric}
            unit={horizontalUnit}
            onValueChange={(value) => {
              widget.update({ paddingLeft: formatValue(value, horizontalUnit) })
            }}
            onUnitChange={(newUnit) => {
              setHorizontalUnit(newUnit)

              widget.update({
                paddingLeft: formatValue(leftNumeric, newUnit),
                paddingRight: formatValue(rightNumeric, newUnit),
              })
            }}
            units={['px', '%']}
            readOnly={readOnly}
            placeholder=""
          />
        </div>
        <div className="field right">
          <DimensionEditor
            numericValue={rightNumeric}
            unit={horizontalUnit}
            onValueChange={(value) => {
              widget.update({
                paddingRight: formatValue(value, horizontalUnit),
              })
            }}
            units={[horizontalUnit]}
            readOnly={readOnly}
            placeholder=""
          />
        </div>
        <div className="field bottom">
          <DimensionEditor
            numericValue={bottomNumeric}
            unit={verticalUnit}
            onValueChange={(value) => {
              widget.update({ paddingBottom: formatValue(value, verticalUnit) })
            }}
            units={[verticalUnit]}
            readOnly={readOnly}
            placeholder=""
          />
        </div>
      </div>
    </div>
  )
})

function parseStringValue<const T extends readonly string[]>(
  value: string,
  units: T,
): [number | null, T[number]] {
  const [fallbackUnit] = units
  if (!fallbackUnit) throw new Error('At least one unit must be provided')

  const unitRegex = new RegExp(`(${units.join('|')})`)
  const valueUnit = value.match(unitRegex)?.[0]
  if (!valueUnit || !isInArray(valueUnit, units)) {
    return [null, fallbackUnit]
  }

  const numericValue = Number.parseFloat(value.replace(valueUnit, ''))
  if (isNaN(numericValue)) return [null, fallbackUnit]

  return [numericValue, valueUnit]
}

function isInArray<const T extends readonly string[]>(
  value: string,
  array: T,
): value is T[number] {
  return array.includes(value)
}

function formatValue(value: number | null, unit: string): string {
  return value === null ? '' : `${value}${unit}`
}
