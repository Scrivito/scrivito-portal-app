const backgroundColorClassNames: Record<string, string> = {
  primary: 'bg-portal-primary text-on-portal-primary',
  secondary: 'bg-portal-secondary text-on-portal-secondary',
  white: 'bg-portal-white text-on-portal-white',
  'light-grey': 'bg-portal-light-grey text-on-portal-light-grey',
  'middle-grey': 'bg-portal-middle-grey text-on-portal-middle-grey',
  'dark-grey': 'bg-portal-dark-grey text-on-portal-dark-grey',
  success: 'bg-portal-success text-on-portal-success',
  info: 'bg-portal-info text-on-portal-info',
  warning: 'bg-portal-warning text-on-portal-warning',
  danger: 'bg-portal-danger text-on-portal-danger',
  transparent: '',
}

export function backgroundClassName(backgroundColor: string): string {
  const className = backgroundColorClassNames[backgroundColor]
  if (className === undefined)
    throw new Error(`Unknown backgroundColor: ${backgroundColor}`)
  return className
}
