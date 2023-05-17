import * as Scrivito from 'scrivito'
import { SectionWidget } from './SectionWidgetClass'

Scrivito.provideComponent(SectionWidget, ({ widget }) => {
  const sectionClassNames: string[] = []

  const backgroundColor = widget.get('backgroundColor')
  if (backgroundColor && backgroundColor !== 'transparent') {
    sectionClassNames.push(`bg-${backgroundColor}`)
  }

  const backgroundImage = widget.get('backgroundImage')
  const backgroundImageClassNames = ['img-background']
  if (widget.get('backgroundAnimateOnHover')) {
    backgroundImageClassNames.push('img-zoom')
  }

  return (
    <section className={sectionClassNames.join(' ')}>
      {backgroundImage && (
        <Scrivito.InPlaceEditingOff>
          <Scrivito.ImageTag
            content={widget}
            attribute="backgroundImage"
            className={backgroundImageClassNames.join(' ')}
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
