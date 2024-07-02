import { ContentTag, provideComponent } from 'scrivito'
import { Homepage } from './HomepageObjClass'

provideComponent(Homepage, ({ page }) => (
  <ContentTag tag="main" id="main" content={page} attribute="body" />
))
