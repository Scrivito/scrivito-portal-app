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
import { localizeAttributeValue } from '../../utils/dataValuesConfig'
import { ensureString } from '../../utils/ensureString'

provideComponent(DataIconWidget, ({ widget }) => {
  const dataItemAttribute = useData().dataItemAttribute() // TODO: Inline
  const attributeValue = ensureString(dataItemAttribute?.get())

  const size = widget.get('size') || 'bi-2x'

  const conditions = widget.get('conditions').filter(isDataIconConditionWidget)
  const matchingCondition =
    dataItemAttribute &&
    conditions.find(
      (condition) => condition.get('attributeValue') === attributeValue,
    )

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
            title={localizeAttributeValue({
              dataClass: dataItemAttribute.dataClass(),
              attributeName: dataItemAttribute.attributeName(),
              attributeValue,
            })}
          />
        </>
      ) : (
        <>
          <IconComponent
            icon={widget.get('fallbackIcon') || 'bi-question-octagon'}
            size={size}
            link={null}
            title={attributeValue || localizeNotAvailable()}
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
