import { provideComponent, ContentTag } from 'scrivito'
import { LabelWidget } from './LabelWidgetClass'

provideComponent(LabelWidget, ({ widget }) => {
  const valueCssClassNames = ['text-multiline']

  const valueSize = widget.get('valueSize')
  if (valueSize && valueSize !== 'body-font-size') {
    valueCssClassNames.push(valueSize)
  }

  return (
    <div>
      <ContentTag
        content={widget}
        attribute="label"
        className="text-bold opacity-60 text-extra-small text-uppercase"
      />
      <ContentTag
        content={widget}
        attribute="value"
        className={valueCssClassNames.join(' ')}
      />
      <ContentTag
        content={widget}
        attribute="details"
        tag="span"
        className="list-value text-muted text-small text-multiline"
      />
    </div>
  )
})
