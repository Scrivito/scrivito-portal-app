import {
  ContentTag,
  WidgetTag,
  connect,
  currentLanguage,
  provideComponent,
  useData,
} from 'scrivito'
import { DataIconWidget } from './DataIconWidgetClass'
import { alignmentClassName } from '../../utils/alignmentClassName'
import {
  DataIconConditionWidgetInstance,
  isDataIconConditionWidget,
} from '../DataIconConditionWidget/DataIconConditionWidgetClass'
import { IconComponent } from '../../Components/Icon'
import { ensureString } from '../../utils/ensureString'
import { useEnumOptions } from '../../utils/useEnumOptions'

provideComponent(DataIconWidget, ({ widget }) => {
  return (
    <WidgetTag className={alignmentClassName(widget.get('alignment'))}>
      <ContentTag
        content={widget}
        attribute="label"
        className="text-bold opacity-60 text-extra-small text-uppercase"
      />
      <AttributeValue
        conditions={widget.get('conditions').filter(isDataIconConditionWidget)}
        fallbackIcon={widget.get('fallbackIcon') || 'bi-question-octagon'}
        size={widget.get('size') || 'bi-2x'}
      />
    </WidgetTag>
  )
})

const AttributeValue = connect(function AttributeValue({
  conditions,
  fallbackIcon,
  size,
}: {
  conditions: DataIconConditionWidgetInstance[]
  fallbackIcon: string
  size: string
}) {
  const attributeValue = ensureString(useData().dataItemAttribute()?.get())
  const matchingCondition =
    attributeValue &&
    conditions.find(
      (condition) => condition.get('attributeValue') === attributeValue,
    )

  const matchingOption = useEnumOptions().find(
    ({ value }) => value === attributeValue,
  )
  const title = matchingOption?.title ?? attributeValue

  return (
    <IconComponent
      icon={
        matchingCondition
          ? matchingCondition.get('icon') || 'bi-box'
          : fallbackIcon
      }
      size={size}
      link={null}
      title={title || localizeNotAvailable()}
    />
  )
})

function localizeNotAvailable(): string {
  switch (currentLanguage()) {
    case 'de':
      return 'k.A.'
    default:
      return 'N/A'
  }
}
