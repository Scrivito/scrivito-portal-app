import { OverlayTrigger, Popover } from 'react-bootstrap'
import {
  connect,
  ContentTag,
  InPlaceEditingOff,
  provideComponent,
  useData,
} from 'scrivito'
import { DataFormOptionsWidget } from './DataFormOptionsWidgetClass'
import { useEnumOptions } from '../../utils/useEnumOptions'
import { Loading } from '../../Components/Loading'

provideComponent(DataFormOptionsWidget, ({ widget }) => {
  const attributeName = useData().attributeName()
  const elementId = useData().dataItem()?.id()
  const id = [
    'DataFormOptionsWidget',
    widget.id(),
    elementId,
    attributeName,
  ].join('-')

  const value = useData().dataItemAttribute()?.get()
  const defaultValue =
    typeof value === 'string' ? value : widget.get('defaultValue')

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
        <Select
          defaultValue={defaultValue}
          id={id}
          isRequired={widget.get('required')}
          name={attributeName ?? ''}
        />
      </div>
    </div>
  )
})

const Select = connect(
  function Select({
    defaultValue,
    id,
    isRequired,
    name,
  }: {
    defaultValue: string
    id: string
    isRequired: boolean
    name: string
  }) {
    const options = useEnumOptions()

    return (
      <select
        className="form-select"
        defaultValue={defaultValue}
        id={id}
        name={name}
        required={isRequired}
      >
        {isRequired ? (
          <option value="" disabled>
            Select an option
          </option>
        ) : (
          <option value=""></option>
        )}

        {options.map(({ value, title }, index) => (
          <option value={value} key={[id, 'option', value, index].join('-')}>
            {title}
          </option>
        ))}
      </select>
    )
  },
  {
    loading: ({ isRequired }: { isRequired: boolean }) => (
      <Loading className="w-100">
        <select className="form-select" required={isRequired} />
      </Loading>
    ),
  },
)
