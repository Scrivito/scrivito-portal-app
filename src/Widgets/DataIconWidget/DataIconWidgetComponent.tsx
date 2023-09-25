import { WidgetTag, provideComponent, useDataItem } from 'scrivito'
import { DataIconWidget } from './DataIconWidgetClass'
import { alignmentClassName } from '../../utils/alignmentClassName'
import { DataIconConditionWidget } from '../DataIconConditionWidget/DataIconConditionWidgetClass'
import { IconComponent } from '../IconWidget/IconWidgetComponent'

provideComponent(DataIconWidget, ({ widget }) => {
  const dataItem = useDataItem()
  if (!dataItem) return null

  const attributeValue = dataItem.get(widget.get('attributeName'))
  if (typeof attributeValue !== 'string') return null

  const size = widget.get('size') || 'bi-2x'

  const conditions = widget.get('conditions').filter(isDataIconConditionWidget)
  const matchingCondition = conditions.find(
    (condition) => condition.get('attributeValue') === attributeValue,
  )

  return (
    <WidgetTag className={alignmentClassName(widget.get('alignment'))}>
      {matchingCondition ? (
        <>
          <IconComponent
            icon={matchingCondition.get('icon') || 'bi-box'}
            size={size}
            link={null}
          />
          <div>{attributeValue}</div>
        </>
      ) : (
        <>
          <IconComponent
            icon={widget.get('fallbackIcon') || 'bi-question-octagon'}
            size={size}
            link={null}
          />
          <div>{attributeValue}</div>
        </>
      )}
    </WidgetTag>
  )
})

function isDataIconConditionWidget(
  item: unknown,
): item is InstanceType<typeof DataIconConditionWidget> {
  return item instanceof DataIconConditionWidget
}
