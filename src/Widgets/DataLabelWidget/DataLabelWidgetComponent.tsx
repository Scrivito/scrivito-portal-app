import {
  connect,
  ContentTag,
  provideComponent,
  useDataItem,
  WidgetTag,
} from 'scrivito'
import { DataLabelWidget } from './DataLabelWidgetClass'
import { RelativeDate } from './RelativeDate'

const CURRENCY = 'EUR' // ISO 4217 Code

provideComponent(DataLabelWidget, ({ widget }) => {
  const dataItem = useDataItem()

  const valueCssClassNames = ['text-multiline']

  const valueSize = widget.get('valueSize')
  if (valueSize && valueSize !== 'body-font-size') {
    valueCssClassNames.push(valueSize)
  }

  return (
    <WidgetTag className={widget.get('marginBottom') ? 'mb-3' : ''}>
      <ContentTag
        content={widget}
        attribute="label"
        className="text-bold text-extra-small text-uppercase"
      />
      <div className={valueCssClassNames.join(' ')}>
        <AttributeValue
          attributeValue={dataItem?.get(widget.get('attributeName'))}
          showAs={widget.get('showAs')}
        />
      </div>

      <ContentTag
        content={widget}
        attribute="details"
        tag="span"
        className="list-value text-muted text-small text-multiline"
      />
    </WidgetTag>
  )
})

const AttributeValue = connect(function AttributeValue({
  attributeValue,
  showAs,
}: {
  attributeValue: unknown
  showAs: string | null
}) {
  if (showAs === 'currency') return <Currency value={attributeValue} />
  if (showAs === 'datetime') return <Datetime value={attributeValue} />

  return <Text value={attributeValue} />
})

function Text({ value }: { value: unknown }) {
  return value ? value.toString() : 'N/A'
}

function Currency({ value }: { value: unknown }) {
  if (value === null) return 'N/A'

  const number = Number(value)
  if (Number.isNaN(number)) return 'N/A'

  const formatter = new Intl.NumberFormat('en', {
    style: 'currency',
    currency: CURRENCY,
  })

  return formatter.format(number)
}

function Datetime({ value }: { value: unknown }) {
  if (value === null) return 'N/A'
  if (typeof value !== 'string') return 'N/A'

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return 'N/A'

  return <RelativeDate date={date} />
}
