import {
  connect,
  ContentTag,
  DataItem,
  provideComponent,
  useDataItem,
  WidgetTag,
} from 'scrivito'
import { DataLabelWidget } from './DataLabelWidgetClass'
import { RelativeDate } from './RelativeDate'
import { localizedAttributeValue } from '../../utils/valuesConfig'

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
          dataItem={dataItem}
          attributeName={widget.get('attributeName')}
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
  dataItem,
  attributeName,
  showAs,
}: {
  dataItem?: DataItem
  attributeName: string
  showAs: string | null
}) {
  if (!dataItem) return 'N/A'

  const attributeValue = dataItem?.get(attributeName)

  if (showAs === 'currency') return <Currency value={attributeValue} />
  if (showAs === 'datetime') return <Datetime value={attributeValue} />

  const value = localizedAttributeValue(dataItem, attributeName)

  return <Text value={value} />
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
