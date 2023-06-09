import * as Scrivito from 'scrivito'
import { SubnavigationOverview } from './SubnavigationOverviewObjClass'

Scrivito.provideComponent(SubnavigationOverview, ({ page }) => (
  <Scrivito.ContentTag content={page} attribute="body" />
))
