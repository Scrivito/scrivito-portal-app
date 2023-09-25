import { OverlayTrigger, Popover } from 'react-bootstrap'
import {
  ContentTag,
  InPlaceEditingOff,
  isInPlaceEditingActive,
  provideComponent,
  useDataItem,
} from 'scrivito'
import { DataFormOptionsWidget } from './DataFormOptionsWidgetClass'

provideComponent(DataFormOptionsWidget, ({ widget }) => {
  const dataItem = useDataItem()

  const id = `data_form_options_widget_${widget.id()}`
  const labelOptions: { htmlFor?: string } = {}
  if (!isInPlaceEditingActive()) labelOptions.htmlFor = id

  const attributeName = widget.get('attributeName')
  const attributeValue = dataItem?.get(attributeName) || ''
  if (typeof attributeValue !== 'string') return null

  const optionsSet = new Set(widget.get('options'))
  if (attributeValue) optionsSet.add(attributeValue)
  const options = [...optionsSet]

  return (
    <div className="mb-3">
      <ContentTag
        content={widget}
        attribute="label"
        tag="label"
        className="form-label"
        {...labelOptions}
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

      <div>
        <select
          defaultValue={attributeValue}
          id={id}
          name={attributeName}
          required={widget.get('required')}
        >
          {widget.get('required') ? (
            <option value="" disabled>
              Select an option
            </option>
          ) : (
            <option value=""></option>
          )}

          {options.map((option, index) => (
            <option
              value={option}
              key={`DataFormOptionsWidget-options-${option}-${index}`}
            >
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
})
