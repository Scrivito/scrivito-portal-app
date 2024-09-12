import * as React from 'react'

interface SingleIconProps {
  icon: string
  setWidgetIcon: (event: React.BaseSyntheticEvent, icon: string) => void
  currentIcon: string
}
export const SingleIcon: React.FC<SingleIconProps> = ({
  icon,
  setWidgetIcon,
  currentIcon,
}) => {
  const cssIcon = `bi-${icon}`

  const aClassNames: string[] = []
  if (currentIcon === cssIcon) aClassNames.push('active')

  return (
    <div className="icon-container">
      <a
        href="#"
        className={aClassNames.join(' ')}
        onClick={(e) => setWidgetIcon(e, cssIcon)}
      >
        <i className={`bs-icon ${cssIcon}`}></i>
        <span className="sr-only">Example of </span>
        {icon}
      </a>
    </div>
  )
}
