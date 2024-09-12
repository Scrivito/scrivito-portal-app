import * as React from 'react'
import { bootstrapIcons } from './bootstrapIcons'
interface AllIconsProps {
  setWidgetIcon: (event: React.BaseSyntheticEvent, icon: string) => void
  currentIcon: string
  hide: boolean
}
interface IconsProps {
  icons: string[]
  currentIcon: string
  setWidgetIcon: (event: React.BaseSyntheticEvent, icon: string) => void
}

export const AllIcons: React.FC<AllIconsProps> = ({
  setWidgetIcon,
  currentIcon,
  hide,
}) => {
  const icons = React.useMemo(() => {
    return bootstrapIcons
  }, [])

  if (hide) return null

  return (
    <div id="icons">
      <Icons
        icons={icons}
        currentIcon={currentIcon}
        setWidgetIcon={setWidgetIcon}
      />
    </div>
  )
}

const Icons: React.FC<IconsProps> = ({ icons, currentIcon, setWidgetIcon }) => {
  return (
    <div className="icon-grid">
      {icons.map((icon, innerIndex) => {
        const cssIcon = `bi-${icon}`
        const aClassNames: string[] = []
        if (currentIcon === cssIcon) aClassNames.push('active')

        return (
          <div key={`${icon}-${innerIndex}`} className="icon-container">
            <a
              href="#"
              className={aClassNames.join(' ')}
              onClick={(e) => setWidgetIcon(e, cssIcon)}
            >
              <i
                className={['bs-icon', cssIcon].join(' ')}
                aria-hidden="true"
              />
              <span className="sr-only">Example of </span>
              {icon}
            </a>
          </div>
        )
      })}
    </div>
  )
}
