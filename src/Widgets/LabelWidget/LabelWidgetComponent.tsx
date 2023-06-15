import * as Scrivito from 'scrivito'
import { LabelWidget } from './LabelWidgetClass'

Scrivito.provideComponent(LabelWidget, ({ widget }) => {
  const valueCssClassNames = ['text-multiline']

  const valueSize = widget.get('valueSize')
  if (valueSize && valueSize !== 'body-font-size') {
    valueCssClassNames.push(valueSize)
  }

  return (
    <div>
      <Scrivito.ContentTag
        content={widget}
        attribute="label"
        className="text-bold opacity-60 text-extra-small text-uppercase"
      />
      <Scrivito.ContentTag
        content={widget}
        attribute="value"
        className={valueCssClassNames.join(' ')}
      />
    </div>
  )
})
