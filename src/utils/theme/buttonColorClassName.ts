const buttonColorClassNames: Record<string, string> = {
  'btn-primary': 'btn-portal-primary',
  'btn-secondary': 'btn-portal-secondary',
  'btn-danger': 'btn-portal-danger',
  'btn-outline-primary': 'btn-portal-outline-primary',
  'btn-outline-secondary': 'btn-portal-outline-secondary',
  'btn-outline-danger': 'btn-portal-outline-danger',
}

export function buttonColorClassName(buttonColor: string): string {
  const className = buttonColorClassNames[buttonColor]
  if (className === undefined) {
    throw new Error(`Unknown button color: ${buttonColor}`)
  }
  return className
}
