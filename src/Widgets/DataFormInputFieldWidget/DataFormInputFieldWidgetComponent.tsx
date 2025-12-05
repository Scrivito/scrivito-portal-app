import { OverlayTrigger, Popover } from 'react-bootstrap'
import {
  ContentTag,
  InPlaceEditingOff,
  provideComponent,
  useData,
} from 'scrivito'
import { DataFormInputFieldWidget } from './DataFormInputFieldWidgetClass'

provideComponent(DataFormInputFieldWidget, ({ widget }) => {
  const attributeName = useData().attributeName()
  const id = [
    'DataFormInputFieldWidget',
    widget.id(),
    useData().dataItem()?.id(),
    attributeName,
  ].join('-')

  const value = useData().dataItemAttribute()?.get()
  const defaultValue = value ? value.toString() : ''

  return (
    <div className="mb-3" key={id}>
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

      {widget.get('type') === 'multi_line' ? (
        <textarea
          className="form-control"
          id={id}
          name={attributeName ?? ''}
          rows={3}
          defaultValue={defaultValue}
          maxLength={10000}
          placeholder={widget.get('placeholder')}
          required={widget.get('required')}
        />
      ) : (
        <input
          className="form-control"
          id={id}
          name={attributeName ?? ''}
          defaultValue={defaultValue}
          maxLength={250}
          placeholder={widget.get('placeholder')}
          type={calculateType(widget.get('type'))}
          required={widget.get('required')}
        />
      )}
    </div>
  )
})

function calculateType(type: string | null): string {
  if (type === 'email') return 'email'
  if (type === 'phone_number') return 'tel'

  return 'text'
}
