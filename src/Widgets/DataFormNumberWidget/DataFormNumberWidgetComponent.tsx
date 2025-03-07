import {
  ContentTag,
  InPlaceEditingOff,
  provideComponent,
  useData,
} from 'scrivito'

import { OverlayTrigger, Popover } from 'react-bootstrap'
import { DataFormNumberWidget } from './DataFormNumberWidgetClass'
import { useCallback, useEffect, useRef, useState } from 'react'

provideComponent(DataFormNumberWidget, ({ widget }) => {
  const max = widget.get('maxValue') ?? undefined
  const min = widget.get('minValue') ?? undefined

  const attributeName = useData().attributeName()
  const id = [
    'DataFormNumberWidget',
    widget.id(),
    useData().dataItem()?.id(),
    attributeName,
  ].join('-')

  const value = useData().dataItemAttribute()?.get()
  const defaultValue = typeof value === 'number' ? value : undefined

  const [hasFocus, setHasFocus] = useState(false)
  const [key, setKey] = useState([id, defaultValue].join('-'))

  useEffect(() => {
    // Force-rerender the uncontrolled input if the underlying data changes.
    // Avoid losing the focus - the input itself may have triggered the update.
    if (!hasFocus) setKey([id, defaultValue].join('-'))
  }, [defaultValue, hasFocus, id])

  const inputRef = useRef<HTMLInputElement>(null)
  const down = useCallback(() => inputRef.current?.stepDown(), [inputRef])
  const up = useCallback(() => inputRef.current?.stepUp(), [inputRef])

  const hasValue = defaultValue !== undefined

  return (
    <div className="mb-3" key={key}>
      <ContentTag
        content={widget}
        attribute="label"
        tag="label"
        className="form-label"
        htmlFor={id}
      />
      {widget.get('required') ? (
        <OverlayTrigger
          placement="top"
          overlay={
            <Popover>
              <Popover.Body>mandatory</Popover.Body>
            </Popover>
          }
        >
          <span className="text-mandatory">*</span>
        </OverlayTrigger>
      ) : null}
      {widget.get('helpText') ? (
        <>
          {' '}
          <OverlayTrigger
            placement="top"
            overlay={
              <Popover>
                <Popover.Body>
                  <InPlaceEditingOff>
                    <ContentTag content={widget} attribute="helpText" />
                  </InPlaceEditingOff>
                </Popover.Body>
              </Popover>
            }
          >
            <i className="bi bi-question-circle"></i>
          </OverlayTrigger>
        </>
      ) : null}
      <br />
      <div className="input-group flex-nowrap">
        <button
          aria-label="-"
          className="btn btn-primary btn-sm"
          disabled={hasValue && min !== undefined && defaultValue <= min}
          onClick={down}
        >
          <i className="bi bi-dash-lg px-0 text-white" />
        </button>
        <input
          className="form-control text-center no-arrows"
          defaultValue={defaultValue}
          id={id}
          max={max}
          min={min}
          name={attributeName ?? ''}
          onBlur={() => setHasFocus(false)}
          onFocus={() => setHasFocus(true)}
          placeholder={widget.get('placeholder')}
          ref={inputRef}
          required={widget.get('required')}
          step={widget.get('stepValue') ?? undefined}
          type="number"
        />
        <button
          aria-label="+"
          className="btn btn-primary btn-sm"
          disabled={hasValue && max !== undefined && defaultValue >= max}
          onClick={up}
        >
          <i className="bi bi-plus-lg px-0 text-white" />
        </button>
      </div>
    </div>
  )
})
