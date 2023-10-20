import { OverlayTrigger, Popover } from 'react-bootstrap'
import {
  ContentTag,
  InPlaceEditingOff,
  isInPlaceEditingActive,
  provideComponent,
  useDataItem,
} from 'scrivito'
import { DataFormInputFieldWidget } from './DataFormInputFieldWidgetClass'

provideComponent(DataFormInputFieldWidget, ({ widget }) => {
  const dataItem = useDataItem()

  const attributeName = widget.get('attributeName')
  const key = `data_form_input_field_widget_${widget.id()}_${attributeName}`

  return (
    <div className="mb-3" key={key}>
      <ContentTag
        content={widget}
        attribute="label"
        tag="label"
        className="form-label"
        htmlFor={isInPlaceEditingActive() ? undefined : key}
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

      {widget.get('type') === 'multi_line' ? (
        <textarea
          className="form-control"
          id={key}
          name={attributeName}
          rows={3}
          defaultValue={getDefaultValue()}
          placeholder={widget.get('placeholder')}
          required={widget.get('required')}
        />
      ) : (
        <input
          className="form-control"
          id={key}
          name={attributeName}
          defaultValue={getDefaultValue()}
          maxLength={250}
          placeholder={widget.get('placeholder')}
          type={calculateType(widget.get('type'))}
          required={widget.get('required')}
        />
      )}
    </div>
  )

  function getDefaultValue() {
    if (!attributeName) return
    const value = dataItem?.get(attributeName)
    if (value) return `${value}`
  }
})

function calculateType(type: string | null): string {
  if (type === 'email') return 'email'
  if (type === 'phone_number') return 'tel'

  return 'text'
}
