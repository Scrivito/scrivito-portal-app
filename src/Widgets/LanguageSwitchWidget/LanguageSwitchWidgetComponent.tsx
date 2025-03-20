import { provideComponent } from 'scrivito'
import { LanguageSwitchWidget } from './LanguageSwitchWidgetClass'
import { LanguageSwitch } from '../TopNavigationWidget/SubComponents/LanguageSwitch'
import { alignmentClassName } from '../../utils/alignmentClassName'

provideComponent(LanguageSwitchWidget, ({ widget }) => {
  const classNames: string[] = []
  const alignment = alignmentClassName(widget.get('alignment'))
  if (alignment) classNames.push(alignment)

  return (
    <div className="navbar-single">
      <div className={classNames.join(' ')}>
        <LanguageSwitch />
      </div>
    </div>
  )
})
