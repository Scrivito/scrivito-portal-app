import {
  connect,
  ContentTag,
  currentLanguage,
  provideComponent,
  useData,
  WidgetTag,
} from 'scrivito'
import { DataLabelWidget } from './DataLabelWidgetClass'
import { RelativeDate } from './RelativeDate'
import {
  formatDateMonthAndYear,
  formatDateTime,
  formatFullDateTime,
  formatFullDayAndMonth,
} from '../../utils/formatDate'
import { useEnumOptions } from '../../utils/useEnumOptions'

const CURRENCY = 'EUR' // ISO 4217 Code

provideComponent(DataLabelWidget, ({ widget }) => {
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
          datetimeFormat={widget.get('datetimeFormat')}
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
  datetimeFormat,
  showAs,
}: {
  datetimeFormat: string | null
  showAs: string | null
}) {
  const rawAttributeValue = useData().dataItemAttribute()?.get()

  const enumOptions = useEnumOptions()
  const matchingOption = enumOptions.find(
    ({ value }) => value === rawAttributeValue,
  )

  const attributeValue = matchingOption?.title ?? rawAttributeValue

  if (showAs === 'currency') return <Currency value={attributeValue} />
  if (showAs === 'datetime') {
    return <Datetime value={attributeValue} datetimeFormat={datetimeFormat} />
  }
  if (showAs === 'link') return <Link value={attributeValue} />

  if (typeof attributeValue === 'number') {
    return <NumberText value={attributeValue} />
  }

  return <Text value={attributeValue} />
})

const Text = connect(function Text({ value }: { value: unknown }) {
  return value ? value.toString() : localizeNotAvailable()
})

const NumberText = connect(function NumberText({ value }: { value: number }) {
  return new Intl.NumberFormat(currentLanguage() ?? 'en', {
    useGrouping: Math.abs(value) >= 10000, // same as newer 'min2' option
  }).format(value)
})

const Currency = connect(function Currency({ value }: { value: unknown }) {
  if (value === null) return localizeNotAvailable()
  if (value instanceof Date) return localizeNotAvailable()

  const number = Number(value)
  if (Number.isNaN(number)) return localizeNotAvailable()

  const formatter = new Intl.NumberFormat(currentLanguage() ?? 'en', {
    style: 'currency',
    currency: CURRENCY,
  })

  return formatter.format(number)
})

const Datetime = connect(function Datetime({
  value,
  datetimeFormat,
}: {
  value: unknown
  datetimeFormat: string | null
}) {
  if (value === null) return localizeNotAvailable()
  if (typeof value !== 'string' && !(value instanceof Date)) {
    return localizeNotAvailable()
  }

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return localizeNotAvailable()

  if (datetimeFormat === 'relative') {
    return <RelativeDate date={date} />
  }

  if (datetimeFormat === 'datetime') {
    return <span title={formatFullDateTime(date)}>{formatDateTime(date)}</span>
  }

  return (
    <span title={formatFullDayAndMonth(date)}>
      {formatDateMonthAndYear(date)}
    </span>
  )
})

function Link({ value }: { value: unknown }) {
  if (typeof value !== 'string') return localizeNotAvailable()
  if (!value) return localizeNotAvailable()

  return (
    <a href={value} target="_blank" rel="noreferrer">
      {value}
    </a>
  )
}

function localizeNotAvailable(): string {
  switch (currentLanguage()) {
    case 'de':
      return 'k.A.'
    default:
      return 'N/A'
  }
}
