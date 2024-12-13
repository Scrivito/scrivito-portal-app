import { Obj, connect } from 'scrivito'
import { Helmet } from 'react-helmet-async'
import { isHomepage, HomepageInstance } from '../Objs/Homepage/HomepageObjClass'
import { isFont } from '../Objs/Font/FontObjClass'
import { FontComponent } from '../Objs/Font/FontComponent'
import { uniqBy } from 'lodash-es'

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

    const fontHeadlineWeight = root.get('siteFontHeadlineWeight') || '500'
    styles.push(`--jr-headline-font-weight: ${fontHeadlineWeight};`)
    const fontHeadline = root.get('siteFontHeadline')[0]
    if (isFont(fontHeadline)) {
      styles.push(`--jr-headline-font-family: ${fontHeadline.get('family')};`)
    }

    const fontBodyWeight = root.get('siteFontBodyWeight') || '500'
    styles.push(`--bs-body-font-weight: ${fontBodyWeight};`)
    const fontBody = root.get('siteFontBody')[0]
    if (isFont(fontBody)) {
      styles.push(`--bs-body-font-family: ${fontBody.get('family')};`)
      styles.push(`--toastify-font-family: ${fontBody.get('family')};`)
    }

    return (
      <>
        <Helmet>
          <style type="text/css">{`:root{\n  ${styles.join('\n  ')}\n}`}</style>
        </Helmet>

        <CustomFonts root={root} />
        {children}
      </>
    )
  },
  { loading: () => null },
)

const CustomFonts = connect(function CustomFonts({
  root,
}: {
  root: HomepageInstance
}) {
  return (
    <>
      {uniqBy(
        [...root.get('siteFontHeadline'), ...root.get('siteFontBody')],
        (obj) => obj.id(),
      ).map((font) => (
        <FontComponent page={font} key={font.id()} />
      ))}
    </>
  )
})
