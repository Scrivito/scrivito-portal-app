import { Obj, connect } from 'scrivito'
import { Helmet } from 'react-helmet-async'
import { isFont } from '../Objs/Font/FontObjClass'
import { isHomepage } from '../Objs/Homepage/HomepageObjClass'

const bodyFontFamily = 'custom-body-font-family'
const headlineFontFamily = 'custom-headline-font-family'

export const DesignAdjustments = connect(
  function DesignAdjustments({ children }: { children: React.ReactNode }) {
    const root = Obj.root()
    if (!isHomepage(root)) return children

    const styles: string[] = []

    const primary = root.get('siteColorPrimary')
    if (primary) styles.push(`--bs-primary: ${primary};`)

    const secondary = root.get('siteColorSecondary')
    if (secondary) styles.push(`--bs-secondary: ${secondary};`)

    const third = root.get('siteColorThird')
    if (third) styles.push(`--third-color: ${third};`)

    const middleGrey = root.get('siteColorMiddleGrey')
    if (middleGrey) styles.push(`--fourth-color: ${middleGrey};`)

    const darkGrey = root.get('siteColorDarkGrey')
    if (darkGrey) styles.push(`--dark-grey: ${darkGrey};`)

    const dropShadow = root.get('siteDropShadow')
    if (!dropShadow) styles.push('--jr-box-shadow: none;')

    const roundedCorners = root.get('siteRoundedCorners')
    if (!roundedCorners) styles.push('--jr-border-radius: 0;')

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
        <Helmet>
          <style type="text/css">{`:root{\n  ${styles.join('\n  ')}\n}`}</style>
        </Helmet>

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
      <Helmet>
        <style type="text/css">
          {`
          @font-face {
            font-family: '${fontFamily}';
            font-display: swap;
            src: url('${encodeURI(fontUrl)}');
            ${weight ? `font-weight: ${weight};` : ''}
          }
        `}
        </style>
      </Helmet>
    )
  },
  { loading: () => null },
)
