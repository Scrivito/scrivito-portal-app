import {
  ContentTag,
  InPlaceEditingOff,
  isInPlaceEditingActive,
  provideComponent,
} from 'scrivito'
import { DataFormUploadWidget } from './DataFormUploadWidgetClass'
import { OverlayTrigger, Popover } from 'react-bootstrap'

provideComponent(DataFormUploadWidget, ({ widget }) => {
  const id = ['DataFormUploadWidget', widget.id()].join('-')
  const labelOptions: { htmlFor?: string } = {}
  if (!isInPlaceEditingActive()) labelOptions.htmlFor = id

  const attributeName = widget.get('attributeName')

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

      <input
        className="form-control"
        type="file"
        id={id}
        multiple={widget.get('multiple')}
        name={attributeName}
        required={widget.get('required')}
      />
    </div>
  )
})
