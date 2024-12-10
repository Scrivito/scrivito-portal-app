import { Obj, connect } from 'scrivito'
import { Helmet } from 'react-helmet-async'
import { isHomepage, HomepageInstance } from '../Objs/Homepage/HomepageObjClass'
import { isFont } from '../Objs/Font/FontObjClass'
import { FontComponent } from '../Objs/Font/FontComponent'

export const DesignAdjustments = connect(
  function DesignAdjustments({ children }: { children: React.ReactNode }) {
    const root = Obj.root()
    if (!isHomepage(root)) return children

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
    if (secondaryDarken) {
      styles.push(`--bs-secondary-darken: ${secondaryDarken};`)
    }

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
          {/* @ts-expect-error helmet bug: https://github.com/nfl/react-helmet/issues/344*/}
          <body style={styles.join(' ')}></body>
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
      {[...root.get('siteFontHeadline'), ...root.get('siteFontBody')]
        .filter(
          (font, index, self) =>
            index === self.findIndex((f) => f.id() === font.id()),
        )
        .map((font) => (
          <FontComponent page={font} key={font.id()} />
        ))}
    </>
  )
})
