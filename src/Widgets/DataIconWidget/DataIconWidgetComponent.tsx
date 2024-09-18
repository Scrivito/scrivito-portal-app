import {
  ContentTag,
  WidgetTag,
  currentLanguage,
  provideComponent,
  useData,
} from 'scrivito'
import { DataIconWidget } from './DataIconWidgetClass'
import { alignmentClassName } from '../../utils/alignmentClassName'
import { isDataIconConditionWidget } from '../DataIconConditionWidget/DataIconConditionWidgetClass'
import { IconComponent } from '../../Components/Icon'
import { ensureString } from '../../utils/ensureString'
import { useEnumOptions } from '../../utils/useEnumOptions'

provideComponent(DataIconWidget, ({ widget }) => {
  const attributeValue = ensureString(useData().dataItemAttribute()?.get())

  const size = widget.get('size') || 'bi-2x'

  const conditions = widget.get('conditions').filter(isDataIconConditionWidget)
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
    <WidgetTag className={alignmentClassName(widget.get('alignment'))}>
      <ContentTag
        content={widget}
        attribute="label"
        className="text-bold opacity-60 text-extra-small text-uppercase"
      />
      {matchingCondition ? (
        <>
          <IconComponent
            icon={matchingCondition.get('icon') || 'bi-box'}
            size={size}
            link={null}
            title={title}
          />
        </>
      ) : (
        <>
          <IconComponent
            icon={widget.get('fallbackIcon') || 'bi-question-octagon'}
            size={size}
            link={null}
            title={title || localizeNotAvailable()}
          />
        </>
      )}
    </WidgetTag>
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
