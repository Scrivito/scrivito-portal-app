import { ContentTag, provideComponent } from 'scrivito'
import { SubnavigationOverview } from './SubnavigationOverviewObjClass'

provideComponent(SubnavigationOverview, ({ page }) => (
  <main id="main">
    <ContentTag content={page} attribute="body" />
  </main>
))
