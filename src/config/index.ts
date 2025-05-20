import { configureErrorReporting } from './configureErrorReporting'
import { configureHistory } from './history'
import { configureObjClassForContentType } from './objClassForContentType'
import { configureScrivito } from './scrivito'
import { configureScrivitoContentBrowser } from './scrivitoContentBrowser'
import { configureWindowScrivito } from './windowScrivito'

export function configure() {
  configureScrivito()

  configureObjClassForContentType()
  configureScrivitoContentBrowser()
  configureHistory()
  configureErrorReporting()
  configureWindowScrivito()
}
