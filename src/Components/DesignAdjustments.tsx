import { Obj, connect } from 'scrivito'
import { isFont } from '../Objs/Font/FontObjClass'
import { isHomepage } from '../Objs/Homepage/HomepageObjClass'

const bodyFontFamily = 'custom-body-font-family'
const headlineFontFamily = 'custom-headline-font-family'

export const DesignAdjustments = connect(
  function DesignAdjustments({ children }: { children: React.ReactNode }) {
    const root = Obj.root()
    if (!isHomepage(root)) return children

    const styles: string[] = []

    const darkText = root.get('siteColorTextDark')
    if (darkText) styles.push(`--dark-text-color: ${darkText};`)

    const darkHeadlineText = root.get('siteColorTextDarkHeadline')
    if (darkHeadlineText) {
      styles.push(`--dark-headline-text-color: ${darkHeadlineText};`)
    }

    const lightText = root.get('siteColorTextLight')
    if (lightText) styles.push(`--light-text-color: ${lightText};`)

    const lightHeadlineText = root.get('siteColorTextLightHeadline')
    if (lightHeadlineText) {
      styles.push(`--light-headline-text-color: ${lightHeadlineText};`)
    }

    const primary = root.get('siteColorPrimary')
    if (primary) styles.push(`--bs-primary: ${primary};`)

    const secondary = root.get('siteColorSecondary')
    if (secondary) styles.push(`--bs-secondary: ${secondary};`)

    const dropShadow = root.get('siteDropShadow')
    if (!dropShadow) styles.push('--jr-box-shadow: none;')

    const siteBorderRadius = root.get('siteBorderRadius')
    if (siteBorderRadius) {
      styles.push(`--bs-border-radius: ${siteBorderRadius};`)
    } else {
      const roundedCorners = root.get('siteRoundedCorners')
      if (!roundedCorners) styles.push('--bs-border-radius: 0;')
    }

    const fontBodyWeight = root.get('siteFontBodyWeight') || '500'
    styles.push(`--bs-body-font-weight: ${fontBodyWeight};`)
    if (root.get('siteFontBody').length > 0) {
      styles.push(`--bs-body-font-family: ${bodyFontFamily};`)
    }

    const fontHeadlineWeight = root.get('siteFontHeadlineWeight') || '500'
    styles.push(`--jr-headline-font-weight: ${fontHeadlineWeight};`)
    if (root.get('siteFontHeadline').length > 0) {
      styles.push(`--jr-headline-font-family: ${headlineFontFamily};`)
    }

    return (
      <>
        <link
          rel="stylesheet"
          precedence="default"
          href={`data:text/css,${encodeURIComponent(`:root{${styles.join('')}}`)}`}
        />

        {root.get('siteFontHeadline').map((font) => (
          <FontFace
            font={font}
            fontFamily={headlineFontFamily}
            key={`${headlineFontFamily}-${font.id()}`}
          />
        ))}

        {root.get('siteFontBody').map((font) => (
          <FontFace
            font={font}
            fontFamily={bodyFontFamily}
            key={`${bodyFontFamily}-${font.id()}`}
          />
        ))}

        {children}
      </>
    )
  },
  { loading: () => null },
)

const FontFace = connect(
  function FontFace({ font, fontFamily }: { font: Obj; fontFamily: string }) {
    if (!isFont(font)) return null

    const fontUrl = font.get('blob')?.url()
    if (!fontUrl) return null

    const weight = font.get('weight')

    return (
      <link
        rel="stylesheet"
        precedence="default"
        href={`data:text/css,${encodeURIComponent(
          `@font-face{
            font-family: '${fontFamily}';
            font-display: swap;
            src: url('${encodeURI(fontUrl)}');
            ${weight ? `font-weight: ${weight};` : ''}}`,
        )}`}
      />
    )
  },
  { loading: () => null },
)
