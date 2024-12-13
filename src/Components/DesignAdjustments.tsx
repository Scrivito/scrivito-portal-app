import { Obj, connect } from 'scrivito'
import { isHomepage } from '../Objs/Homepage/HomepageObjClass'
import { Helmet } from 'react-helmet-async'

export const DesignAdjustments = connect(
  function DesignAdjustments({ children }: { children: React.ReactNode }) {
    const root = Obj.root()
    if (!isHomepage(root)) return children

    const styles: string[] = []

    const primary = root.get('siteColorPrimary')
    if (primary) styles.push(`--bs-primary: ${primary};`)

    const secondary = root.get('siteColorSecondary')
    if (secondary) styles.push(`--bs-secondary: ${secondary};`)

    const dropShadow = root.get('siteDropShadow')
    if (!dropShadow) styles.push('--jr-box-shadow: none;')

    const roundedCorners = root.get('siteRoundedCorners')
    if (!roundedCorners) styles.push('--jr-border-radius: 0;')

    return (
      <>
        <Helmet>
          <style type="text/css">{`:root{\n  ${styles.join('\n  ')}\n}`}</style>
        </Helmet>
        {children}
      </>
    )
  },
  { loading: () => null },
)
