import * as Scrivito from 'scrivito'
import { SectionWidget } from './SectionWidgetClass'

Scrivito.provideComponent(SectionWidget, ({ widget }) => {
  const sectionClassNames: string[] = []

  const backgroundColor = widget.get('backgroundColor')
  if (backgroundColor && backgroundColor !== 'transparent') {
    sectionClassNames.push(`bg-${backgroundColor}`)
  }

  const backgroundImage = widget.get('backgroundImage')

  return (
    <section className={sectionClassNames.join(' ')}>
      {backgroundImage && (
        <Scrivito.InPlaceEditingOff>
          <Scrivito.ImageTag
            content={widget}
            attribute="backgroundImage"
            className="img-background"
          />
        </Scrivito.InPlaceEditingOff>
      )}
      <Scrivito.ContentTag
        tag="div"
        content={widget}
        className="container"
        attribute="content"
      />
    </section>
  )
})
