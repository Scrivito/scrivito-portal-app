import { provideComponent } from 'scrivito'
import { LanguageSwitchWidget } from './LanguageSwitchWidgetClass'
import { LanguageSwitch } from '../TopNavigationWidget/SubComponents/LanguageSwitch'

provideComponent(LanguageSwitchWidget, () => <LanguageSwitch />)
