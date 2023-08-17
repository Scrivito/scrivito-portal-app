import { ContentTag, provideComponent } from 'scrivito'
import { Homepage } from './HomepageObjClass'

provideComponent(Homepage, ({ page }) => (
  <ContentTag tag="div" content={page} attribute="body" />
))
