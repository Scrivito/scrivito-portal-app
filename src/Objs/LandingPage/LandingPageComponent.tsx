import { provideComponent, ContentTag } from 'scrivito'
import { LandingPage } from './LandingPageObjClass'

provideComponent(LandingPage, ({ page }) => (
  <ContentTag tag="div" content={page} attribute="body" />
))
