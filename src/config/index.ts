import { configureErrorReporting } from './configureErrorReporting'
import { configureEtracker } from './configureEtracker'
import { configurePisaSalesQuestionnaireWidgets } from './configurePisaSalesQuestionnaireWidgets'
import { configureHistory } from './history'
import { configureObjClassForContentType } from './objClassForContentType'
import { configureScrivito } from './scrivito'
import { configureScrivitoContentBrowser } from './scrivitoContentBrowser'
import { configureWindowScrivito } from './windowScrivito'
import { configurePisaSalesDataService } from '../Data/configurePisaSalesDataService'

export async function configure(): Promise<void> {
  configureScrivito()

  configureObjClassForContentType()
  configureScrivitoContentBrowser()
  configureHistory()
  configureErrorReporting()
  configureWindowScrivito()
  await configurePisaSalesDataService()
  configurePisaSalesQuestionnaireWidgets()
  configureEtracker()
}
