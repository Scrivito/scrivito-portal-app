import { ContentTag, provideComponent } from 'scrivito'
import { SubnavigationOverview } from './SubnavigationOverviewObjClass'

provideComponent(SubnavigationOverview, ({ page }) => (
  <ContentTag tag="main" id="main" content={page} attribute="body" />
))
