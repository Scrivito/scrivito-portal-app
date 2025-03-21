import { provideComponent } from 'scrivito'
import { LanguageSwitchWidget } from './LanguageSwitchWidgetClass'
import { LanguageSwitch } from '../TopNavigationWidget/SubComponents/LanguageSwitch'
import { alignmentClassName } from '../../utils/alignmentClassName'

provideComponent(LanguageSwitchWidget, ({ widget }) => {
  const classNames = ['navbar-single']
  const alignment = alignmentClassName(widget.get('alignment') ?? 'right')
  if (alignment) classNames.push(alignment)

  return (
    <div className={classNames.join(' ')}>
      <LanguageSwitch
        align={widget.get('alignment') === 'right' ? 'end' : 'start'}
      />
    </div>
  )
})
