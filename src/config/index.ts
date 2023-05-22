import { configureObjClassForContentType } from './objClassForContentType'
import { configureScrivito } from './scrivito'
import { configureScrivitoContentBrowser } from './scrivitoContentBrowser'
import { configureWindowScrivito } from './windowScrivito'

export function configure() {
  configureScrivito()

  configureObjClassForContentType()
  configureScrivitoContentBrowser()
  configureWindowScrivito()
}
