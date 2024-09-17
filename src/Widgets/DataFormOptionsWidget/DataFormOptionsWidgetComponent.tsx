import { OverlayTrigger, Popover } from 'react-bootstrap'
import {
  ContentTag,
  InPlaceEditingOff,
  provideComponent,
  useData,
} from 'scrivito'
import { DataFormOptionsWidget } from './DataFormOptionsWidgetClass'
import {
  dataValues,
  localizeAttributeValue,
} from '../../utils/dataValuesConfig'

provideComponent(DataFormOptionsWidget, ({ widget }) => {
  const dataItemAttribute = useData().dataItemAttribute()
  const attributeName = useData().attributeName()

  const id = ['DataFormOptionsWidget', widget.id(), attributeName].join('-')

  const attributeValue = dataItemAttribute?.get()
  const defaultValue =
    typeof attributeValue === 'string'
      ? attributeValue
      : widget.get('defaultValue')

  const dataClass = useData().dataClass()
  if (!dataClass) return null

  const options = new Set(
    attributeName ? dataValues(dataClass, attributeName) : [],
  )
  if (typeof attributeValue === 'string' && attributeValue) {
    options.add(attributeValue)
  }

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

      <div>
        <select
          className="form-select"
          defaultValue={defaultValue}
          id={id}
          name={attributeName ?? ''}
          required={widget.get('required')}
        >
          {widget.get('required') ? (
            <option value="" disabled>
              Select an option
            </option>
          ) : (
            <option value=""></option>
          )}

          {attributeName &&
            [...options].map((attributeValue, index) => (
              <option
                value={attributeValue}
                key={[id, 'option', attributeValue, index].join('-')}
              >
                {localizeAttributeValue({
                  dataClass,
                  attributeName,
                  attributeValue,
                })}
              </option>
            ))}
        </select>
      </div>
    </div>
  )
})
