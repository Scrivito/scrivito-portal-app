import * as Scrivito from 'scrivito'
import { Homepage } from './HomepageObjClass'

Scrivito.provideComponent(Homepage, ({ page }) => (
  <Scrivito.ContentTag tag="div" content={page} attribute="body" />
))
