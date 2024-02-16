import { provideComponent, ContentTag, InPlaceEditingOff } from 'scrivito'
import { Popover, OverlayTrigger } from 'react-bootstrap'
import { getFieldName } from '../FormContainerWidget/utils/getFieldName'
import { FormCheckboxWidget } from './FormCheckboxWidgetClass'

provideComponent(FormCheckboxWidget, ({ widget }) => {
  const id = `form_checkbox_widget_${widget.id()}`

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
      ) : null}
    </div>
  )
})
