import { provideComponent, ContentTag } from 'scrivito'
import { Page } from './PageObjClass'

provideComponent(Page, ({ page }) => (
  <ContentTag tag="div" content={page} attribute="body" />
))
