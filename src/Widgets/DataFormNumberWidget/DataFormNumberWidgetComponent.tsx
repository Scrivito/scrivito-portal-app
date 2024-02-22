import {
  ContentTag,
  InPlaceEditingOff,
  provideComponent,
  useDataItem,
} from 'scrivito'

import { OverlayTrigger, Popover } from 'react-bootstrap'
import { DataFormNumberWidget } from './DataFormNumberWidgetClass'

provideComponent(DataFormNumberWidget, ({ widget }) => {
  const dataItem = useDataItem()

  const id = ['DataFormNumberWidget', widget.id(), dataItem?.id()].join('-')

  const attributeName = widget.get('attributeName')
  const attributeValue = dataItem?.get(attributeName)
  const defaultValue =
    typeof attributeValue === 'number' ? attributeValue : undefined

  return (
    <div className="mb-3" key={[id, attributeName, defaultValue].join('-')}>
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
        defaultValue={defaultValue}
        id={id}
        name={attributeName}
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
