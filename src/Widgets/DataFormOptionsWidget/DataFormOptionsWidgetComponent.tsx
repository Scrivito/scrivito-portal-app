import { OverlayTrigger, Popover } from 'react-bootstrap'
import {
  ContentTag,
  InPlaceEditingOff,
  isInPlaceEditingActive,
  provideComponent,
  useDataItem,
} from 'scrivito'
import { DataFormOptionsWidget } from './DataFormOptionsWidgetClass'
import { ensureString } from '../../utils/ensureString'

provideComponent(DataFormOptionsWidget, ({ widget }) => {
  const dataItem = useDataItem()

  const id = ['DataFormOptionsWidget', widget.id()].join('-')
  const labelOptions: { htmlFor?: string } = {}
  if (!isInPlaceEditingActive()) labelOptions.htmlFor = id

  const attributeName = widget.get('attributeName')
  const attributeValue = ensureString(dataItem?.get(attributeName))
  const defaultValue = dataItem ? attributeValue : widget.get('defaultValue')

  const optionsSet = new Set(widget.get('options'))
  if (attributeValue) optionsSet.add(attributeValue)
  const options = [...optionsSet]

  return (
    <div className="mb-3" key={[id, attributeName].join('-')}>
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
          className="form-select"
          defaultValue={defaultValue}
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
              key={[id, 'option', option, index].join('-')}
            >
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
})
