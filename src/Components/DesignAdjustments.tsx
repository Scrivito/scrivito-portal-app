import { Obj, connect } from 'scrivito'
import { isHomepage } from '../Objs/Homepage/HomepageObjClass'
import { Helmet } from 'react-helmet-async'

export const DesignAdjustments = connect(function DesignAdjustments() {
  const root = Obj.root()
  if (!isHomepage(root)) return null

  const styles: string[] = []

  const primary = root.get('siteColorPrimary')
  if (primary) styles.push(`--bs-primary: ${primary};`)

  const primaryLighten = root.get('siteColorPrimaryLighten')
  if (primaryLighten) styles.push(`--bs-primary-lighten: ${primaryLighten};`)

  const primaryDarken = root.get('siteColorPrimaryDarken')
  if (primaryDarken) styles.push(`--bs-primary-darken: ${primaryDarken};`)

  const secondary = root.get('siteColorSecondary')
  if (secondary) styles.push(`--bs-secondary: ${secondary};`)

  const secondaryLighten = root.get('siteColorSecondaryLighten')
  if (secondaryLighten) {
    styles.push(`--bs-secondary-lighten: ${secondaryLighten};`)
  }

  const secondaryDarken = root.get('siteColorSecondaryDarken')
  if (secondaryDarken) styles.push(`--bs-secondary-darken: ${secondaryDarken};`)

  const dropShadow = root.get('siteDropShadow')
  if (!dropShadow) styles.push('--jr-card-box-shadow: none;')

  const roundedCorners = root.get('siteRoundedCorners')
  if (!roundedCorners) styles.push('--jr-card-border-radius: 0;')

  return (
    <Helmet>
      {/* @ts-expect-error helmet bug: https://github.com/nfl/react-helmet/issues/344*/}
      <body style={styles.join(' ')}></body>
    </Helmet>
  )
})
