import {
  provideComponent,
  isInPlaceEditingActive,
  ContentTag,
  InPlaceEditingOff,
} from 'scrivito'
import { Popover, OverlayTrigger } from 'react-bootstrap'
import { getFieldName } from '../FormContainerWidget/utils/getFieldName'
import { FormCheckboxWidget } from './FormCheckboxWidgetClass'

provideComponent(FormCheckboxWidget, ({ widget }) => {
  const id = `form_checkbox_widget_${widget.id()}`

  const labelOptions: { htmlFor?: string } = {}
  if (!isInPlaceEditingActive()) labelOptions.htmlFor = id

  return (
    <div className="form-check mb-3">
      <input
        className="form-check-input"
        id={id}
        type="checkbox"
        name={getFieldName(widget)}
        required={widget.get('required')}
      />

      <ContentTag
        className="form-check-label"
        content={widget}
        attribute="label"
        tag="label"
        {...labelOptions}
      />
      {widget.get('required') ? (
        <OverlayTrigger
          placement="top"
          trigger="hover"
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
        <OverlayTrigger
          placement="top"
          trigger="hover"
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
          <i className="fa fa-question-circle-o fa-1x ml-1"></i>
        </OverlayTrigger>
      ) : null}
    </div>
  )
})
