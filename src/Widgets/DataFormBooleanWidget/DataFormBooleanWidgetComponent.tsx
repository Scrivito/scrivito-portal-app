import {
  ContentTag,
  InPlaceEditingOff,
  provideComponent,
  useDataItem,
} from 'scrivito'
import { DataFormBooleanWidget } from './DataFormBooleanWidgetClass'
import { OverlayTrigger, Popover } from 'react-bootstrap'

provideComponent(DataFormBooleanWidget, ({ widget }) => {
  const dataItem = useDataItem()

  const id = ['DataFormBooleanWidget', widget.id()].join('-')

  const style = widget.get('style')
  const dataForNo = widget.get('dataForNo')
  const dataForYes = widget.get('dataForYes')
  const attributeName = widget.get('attributeName')
  const attributeValue = dataItem?.get(attributeName)
  const defaultChecked =
    attributeValue !== null
      ? (dataForYes || true) === attributeValue
      : widget.get('defaultValue')

  return (
    <div
      className={['mb-3', 'form-check']
        .concat(style === 'switch' ? 'form-switch' : [])
        .join(' ')}
      key={[id, attributeName, defaultChecked].join('-')}
    >
      <input
        id={id}
        className="form-check-input"
        name={attributeName}
        type="checkbox"
        required={widget.get('required')}
        defaultChecked={defaultChecked}
        value={dataForYes || undefined}
        data-value-unchecked={dataForNo || undefined}
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
