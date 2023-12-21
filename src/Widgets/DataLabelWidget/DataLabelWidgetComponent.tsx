import {
  connect,
  ContentTag,
  provideComponent,
  useDataItem,
  WidgetTag,
} from 'scrivito'
import { DataLabelWidget } from './DataLabelWidgetClass'

provideComponent(DataLabelWidget, ({ widget }) => {
  const dataItem = useDataItem()

  const valueCssClassNames = ['text-multiline']

  const valueSize = widget.get('valueSize')
  if (valueSize && valueSize !== 'body-font-size') {
    valueCssClassNames.push(valueSize)
  }

  return (
    <WidgetTag>
      <ContentTag
        content={widget}
        attribute="label"
        className="text-bold opacity-60 text-extra-small text-uppercase"
      />
      <div className={valueCssClassNames.join(' ')}>
        <AttributeValue
          attributeValue={dataItem?.get(widget.get('attributeName'))}
          showAs={widget.get('showAs')}
          currency={widget.get('currency')}
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
  currency,
  attributeValue,
  showAs,
}: {
  currency: string | null
  attributeValue: unknown
  showAs: string | null
}) {
  if (showAs === 'currency') return formatCurrency(attributeValue, currency)

  return formatText(attributeValue)
})

function formatText(value: unknown) {
  return value ? value.toString() : 'N/A'
}

function formatCurrency(value: unknown, currency: string | null) {
  if (value === null) return 'N/A'

  const number = Number(value)
  if (Number.isNaN(number)) return 'N/A'

  const formatter = new Intl.NumberFormat('en', {
    style: 'currency',
    currency: currency || 'EUR',
  })

  return formatter.format(number)
}
