import { ContentTag, provideComponent } from 'scrivito'
import { SubnavigationOverview } from './SubnavigationOverviewObjClass'

provideComponent(SubnavigationOverview, ({ page }) => (
  <ContentTag content={page} attribute="body" />
))
