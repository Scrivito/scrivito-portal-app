import {
  ContentTag,
  InPlaceEditingOff,
  isInPlaceEditingActive,
  provideComponent,
  useDataItem,
} from 'scrivito'
import { DataFormBooleanWidget } from './DataFormBooleanWidgetClass'
import { OverlayTrigger, Popover } from 'react-bootstrap'

provideComponent(DataFormBooleanWidget, ({ widget }) => {
  const dataItem = useDataItem()

  const id = ['DataFormOptionsWidget', widget.id()].join('-')
  const labelOptions: { htmlFor?: string } = {}
  if (!isInPlaceEditingActive()) labelOptions.htmlFor = id

  const attributeName = widget.get('attributeName')
  const attributeValue = dataItem?.get(attributeName)
  const defaultChecked =
    typeof attributeValue === 'boolean'
      ? attributeValue
      : widget.get('defaultValue')

  return (
    <div className="mb-3" key={[id, attributeName, defaultChecked].join('-')}>
      <input
        id={id}
        name={attributeName}
        type="checkbox"
        required={widget.get('required')}
        defaultChecked={defaultChecked}
      />{' '}
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
    </div>
  )
})
