import { provideComponent } from 'scrivito'
import { IconComponent } from '../../Components/Icon'
import { WrapIfClassName } from '../../Components/WrapIfClassName'
import { alignmentClassNameWithBlock } from '../../utils/alignmentClassName'
import { IconWidget } from './IconWidgetClass'

provideComponent(IconWidget, ({ widget }) => {
  return (
    <WrapIfClassName
      className={alignmentClassNameWithBlock(widget.get('alignment'))}
    >
      <IconComponent
        icon={widget.get('icon')}
        size={widget.get('size')}
        link={widget.get('link')}
      />
    </WrapIfClassName>
  )
})
