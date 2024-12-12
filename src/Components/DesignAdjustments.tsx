import { Obj, connect } from 'scrivito'
import { isHomepage } from '../Objs/Homepage/HomepageObjClass'
import { Helmet } from 'react-helmet-async'

export const DesignAdjustments = connect(
  function DesignAdjustments({ children }: { children: React.ReactNode }) {
    const root = Obj.root()
    if (!isHomepage(root)) return children

    const styles: string[] = []

    const primary = root.get('siteColorPrimary')
    if (primary) {
      styles.push(`--bs-primary: ${primary};`)
      styles.push(`--bs-primary-lighten: hsl(from ${primary} h s calc(l + 8));`)
      styles.push(`--bs-primary-darken: hsl(from ${primary} h s calc(l - 8));`)
    }

    const secondary = root.get('siteColorSecondary')
    if (secondary) {
      styles.push(`--bs-secondary: ${secondary};`)
      styles.push(
        `--bs-secondary-lighten: hsl(from ${secondary} h s calc(l + 8));`,
      )
      styles.push(
        `--bs-secondary-darken: hsl(from ${secondary} h s calc(l - 8));`,
      )
    }

    const dropShadow = root.get('siteDropShadow')
    if (!dropShadow) styles.push('--jr-box-shadow: none;')

    const roundedCorners = root.get('siteRoundedCorners')
    if (!roundedCorners) styles.push('--jr-border-radius: 0;')

    return (
      <>
        <Helmet>
          {/* @ts-expect-error helmet bug: https://github.com/nfl/react-helmet/issues/344*/}
          <body style={styles.join(' ')}></body>
        </Helmet>
        {children}
      </>
    )
  },
  { loading: () => null },
)
