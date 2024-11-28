import { Obj, connect } from 'scrivito'
import { isHomepage, HomepageInstance } from '../Objs/Homepage/HomepageObjClass'
import { Helmet } from 'react-helmet-async'
import { isFont } from '../Objs/Font/FontObjClass'

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

    const fontHeadline = root.get('siteFontHeadline')
    if (fontHeadline.length > 0 && fontHeadline.every(isFont)) {
      const headlineFontFamily = fontHeadline[0]!.get('family')
      styles.push(`--jr-headline-font-family: ${headlineFontFamily};`)
    }

    const fontBody = root.get('siteFontBody')
    if (fontBody.length > 0 && fontBody.every(isFont)) {
      const bodyFontFamily = fontBody[0]!.get('family')
      styles.push(`--bs-body-font-family: ${bodyFontFamily};`)
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

const CustomFonts = connect(
  function CustomFonts({ root }: { root: HomepageInstance }) {
    const styles: string[] = []

    root.get('siteFontHeadline').forEach((f) => styles.push(toFontFace(f)))
    root.get('siteFontBody').forEach((f) => styles.push(toFontFace(f)))

    return (
      <Helmet>
        <style type="text/css">{styles.join('\n')}</style>
      </Helmet>
    )
  },
  { loading: () => null },
)

function toFontFace(font: Obj): string {
  if (!isFont(font)) return ''

  const format = font.get('format') || 'woff2'
  if (!format) return ''

  const family = CSS.escape(font.get('family'))
  if (!family) return ''

  const weight = font.get('weight')
  if (!weight) return ''

  const imageUrl = font.get('blob')?.url()
  if (!imageUrl) return ''

  return `
      @font-face {
        font-family: '${family}';
        font-display: swap;
        src:
          local(''),
          url('${imageUrl}') format('${format}') tech('variations'),
          url('${imageUrl}') format('${format}-variations');
        font-weight: ${weight};
      }
    `
}
