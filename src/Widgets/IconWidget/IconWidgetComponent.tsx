import { provideComponent, WidgetTag } from 'scrivito'
import { IconComponent } from '../../Components/Icon'
import { alignmentClassNameWithBlock } from '../../utils/alignmentClassName'
import { IconWidget } from './IconWidgetClass'

provideComponent(IconWidget, ({ widget }) => {
  return (
    <WidgetTag className={alignmentClassNameWithBlock(widget.get('alignment'))}>
      <IconComponent
        icon={widget.get('icon')}
        size={widget.get('size') || 'bi-2x'}
        link={widget.get('link')}
      />
    </WidgetTag>
  )
})
