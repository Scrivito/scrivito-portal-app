import {
  ContentTag,
  InPlaceEditingOff,
  provideComponent,
  useData,
} from 'scrivito'
import { DataFormBooleanWidget } from './DataFormBooleanWidgetClass'
import { OverlayTrigger, Popover } from 'react-bootstrap'
import './DataFormBooleanWidget.scss'

provideComponent(DataFormBooleanWidget, ({ widget }) => {
  const dataItemAttribute = useData().dataItemAttribute()
  const attributeName = useData().attributeName()

  const id = ['DataFormBooleanWidget', widget.id(), attributeName].join('-')

  const attributeValue = dataItemAttribute?.get()
  const defaultChecked =
    typeof attributeValue === 'boolean'
      ? attributeValue
      : widget.get('defaultValue')

  const classNames = ['data-form-boolean-widget', 'mb-3', 'form-check']
  if (widget.get('style') === 'switch') classNames.push('form-switch')

  return (
    <div
      className={classNames.join(' ')}
      key={[id, widget.get('defaultValue')].join('-')}
    >
      <input
        id={id}
        className="form-check-input"
        name={attributeName || ''}
        type="checkbox"
        required={widget.get('required')}
        defaultChecked={defaultChecked}
      />{' '}
      <ContentTag
        content={widget}
        attribute="label"
        tag="label"
        className="form-label form-check-label"
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
    </div>
  )
})
