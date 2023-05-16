import * as Scrivito from 'scrivito'
import { SectionWidget } from './SectionWidgetClass'

Scrivito.provideComponent(SectionWidget, ({ widget }) => (
  <section>
    <Scrivito.ContentTag
      tag="div"
      className="container"
      content={widget}
      attribute="content"
    />
  </section>
))
