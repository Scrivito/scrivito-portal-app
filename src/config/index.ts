import { configureErrorReporting } from './configureErrorReporting'
import { configureEtracker } from './configureEtracker'
import { configurePisaSalesQuestionnaireWidgets } from './configurePisaSalesQuestionnaireWidgets'
import { configureHistory } from './history'
import { configureObjClassForContentType } from './objClassForContentType'
import { configureScrivito } from './scrivito'
import { configureScrivitoContentBrowser } from './scrivitoContentBrowser'
import { configureWindowScrivito } from './windowScrivito'

export function configure() {
  configureScrivito()

  configureEtracker()
  configureObjClassForContentType()
  configureScrivitoContentBrowser()
  configureHistory()
  configureErrorReporting()
  configureWindowScrivito()
  configurePisaSalesQuestionnaireWidgets()
}
