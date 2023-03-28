import * as Scrivito from 'scrivito'
import { Page } from './PageObjClass'

Scrivito.provideComponent(Page, ({ page }) => (
  <Scrivito.ContentTag tag="div" content={page} attribute="body" />
))
