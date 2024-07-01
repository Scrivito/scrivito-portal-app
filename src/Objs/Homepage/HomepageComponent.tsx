import { ContentTag, provideComponent } from 'scrivito'
import { Homepage } from './HomepageObjClass'

provideComponent(Homepage, ({ page }) => (
  <main id="main">
    <ContentTag tag="div" content={page} attribute="body" />
  </main>
))
