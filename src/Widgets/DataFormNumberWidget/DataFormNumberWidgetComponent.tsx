import {
  ContentTag,
  InPlaceEditingOff,
  provideComponent,
  useData,
} from 'scrivito'

import { OverlayTrigger, Popover } from 'react-bootstrap'
import { DataFormNumberWidget } from './DataFormNumberWidgetClass'
import { useEffect, useState } from 'react'

provideComponent(DataFormNumberWidget, ({ widget }) => {
  const attributeName = useData().attributeName()
  const id = ['DataFormNumberWidget', widget.id(), attributeName].join('-')

  const value = useData().dataItemAttribute()?.get()
  const defaultValue = typeof value === 'number' ? value : undefined

  const [hasFocus, setHasFocus] = useState(false)
  const [key, setKey] = useState([id, defaultValue].join('-'))

  useEffect(() => {
    if (!hasFocus) setKey([id, defaultValue].join('-'))
  }, [defaultValue, hasFocus, id])

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
      <input
        className="form-control"
        defaultValue={defaultValue}
        id={id}
        name={attributeName ?? ''}
        onBlur={() => setHasFocus(false)}
        onFocus={() => setHasFocus(true)}
        placeholder={widget.get('placeholder')}
        required={widget.get('required')}
        type="number"
        min={widget.get('minValue') ?? undefined}
        max={widget.get('maxValue') ?? undefined}
        step={widget.get('stepValue') ?? undefined}
      />
    </div>
  )
})
