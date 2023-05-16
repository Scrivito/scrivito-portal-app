import * as Scrivito from 'scrivito'
import { SectionWidget } from './SectionWidgetClass'

Scrivito.provideComponent(SectionWidget, ({ widget }) => {
  const sectionClassNames: string[] = []

  const backgroundColor = widget.get('backgroundColor')
  if (backgroundColor && backgroundColor !== 'transparent') {
    sectionClassNames.push(`bg-${backgroundColor}`)
  }

  return (
    <section className={sectionClassNames.join(' ')}>
      <Scrivito.ContentTag
        tag="div"
        content={widget}
        className="container"
        attribute="content"
      />
    </section>
  )
})
