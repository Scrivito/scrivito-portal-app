import { ContentTag, WidgetTag, provideComponent, useDataItem } from 'scrivito'
import { DataIconWidget } from './DataIconWidgetClass'
import { alignmentClassName } from '../../utils/alignmentClassName'
import { isDataIconConditionWidget } from '../DataIconConditionWidget/DataIconConditionWidgetClass'
import { IconComponent } from '../../Components/Icon'
import { localizeAttributeValue } from '../../utils/dataValuesConfig'
import { ensureString } from '../../utils/ensureString'

provideComponent(DataIconWidget, ({ widget }) => {
  const dataItem = useDataItem()

  const attributeName = widget.get('attributeName')
  const attributeValue = ensureString(dataItem?.get(attributeName))

  const size = widget.get('size') || 'bi-2x'

  const conditions = widget.get('conditions').filter(isDataIconConditionWidget)
  const matchingCondition = conditions.find(
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
            title={
              dataItem
                ? localizeAttributeValue({
                    dataClass: dataItem.dataClass(),
                    attributeName,
                    attributeValue,
                  })
                : attributeValue
            }
          />
        </>
      ) : (
        <>
          <IconComponent
            icon={widget.get('fallbackIcon') || 'bi-question-octagon'}
            size={size}
            link={null}
            title={`${attributeValue}` || 'N/A'}
          />
        </>
      )}
    </WidgetTag>
  )
})
