import { Obj, provideComponent, urlFor, WidgetTag } from 'scrivito'
import { IconComponent } from '../../Components/Icon'
import { alignmentClassNameWithBlock } from '../../utils/alignmentClassName'
import { IconWidget } from './IconWidgetClass'

provideComponent(IconWidget, ({ widget }) => {
  const image = widget.get('image')

  return (
    <WidgetTag className={alignmentClassNameWithBlock(widget.get('alignment'))}>
      <IconComponent
        icon={widget.get('icon')}
        imageUrl={image instanceof Obj ? urlFor(image) : undefined}
        size={widget.get('size') || 'bi-2x'}
        link={widget.get('link')}
      />
    </WidgetTag>
  )
})
