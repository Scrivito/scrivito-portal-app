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
    if (primary) {
      styles.push(`--bs-primary: ${primary};`)

      const [primaryText, primaryHeadlineText] = getTextColors(primary)
      styles.push(`--bs-primary-text-color: ${primaryText};`)
      styles.push(`--bs-primary-headline-text-color: ${primaryHeadlineText};`)
    }

    const secondary = root.get('siteColorSecondary')
    if (secondary) {
      styles.push(`--bs-secondary: ${secondary};`)

      const [secondaryText, secondaryHeadlineText] = getTextColors(secondary)
      styles.push(`--bs-secondary-text-color: ${secondaryText};`)
      styles.push(
        `--bs-secondary-headline-text-color: ${secondaryHeadlineText};`,
      )
    }

    const third = root.get('siteColorThird')
    if (third) {
      styles.push(`--third-color: ${third};`)

      const [thirdText, thirdHeadlineText] = getTextColors(third)
      styles.push(`--third-text-color: ${thirdText};`)
      styles.push(`--third-headline-text-color: ${thirdHeadlineText};`)
    }

    const fourth = root.get('siteColorFourth')
    if (fourth) {
      styles.push(`--fourth-color: ${fourth};`)

      const [fourthText, fourthHeadlineText] = getTextColors(fourth)
      styles.push(`--fourth-text-color: ${fourthText};`)
      styles.push(`--fourth-headline-text-color: ${fourthHeadlineText};`)
    }

    const fifth = root.get('siteColorFifth')
    if (fifth) {
      styles.push(`--fifth-color: ${fifth};`)

      const [fifthText, fifthHeadlineText] = getTextColors(fifth)
      styles.push(`--fifth-text-color: ${fifthText};`)
      styles.push(`--fifth-headline-text-color: ${fifthHeadlineText};`)
    }

    const dropShadow = root.get('siteDropShadow')
    if (!dropShadow) styles.push('--jr-box-shadow: none;')

    const siteBorderRadius = root.get('siteBorderRadius')
    if (siteBorderRadius) {
      styles.push(`--jr-border-radius: ${siteBorderRadius};`)
    } else {
      const roundedCorners = root.get('siteRoundedCorners')
      if (!roundedCorners) styles.push('--jr-border-radius: 0;')
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

function getTextColors(backgroundColor: string): [string, string] {
  return colorIsLight(backgroundColor)
    ? ['var(--dark-text-color)', 'var(--dark-headline-text-color)']
    : ['var(--light-text-color)', 'var(--light-headline-text-color)']
}

function colorIsLight(hex: string): boolean {
  if (
    !/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{4}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/.test(
      hex,
    )
  ) {
    return false
  }

  let color = hex.replace('#', '')

  // Expand shorthand notation
  if (color.length === 3 || color.length === 4) {
    color = color
      .split('')
      .map((char) => char + char)
      .join('')
  }

  // According to ITU-R BT.709
  const r = parseInt(color.slice(0, 2), 16)
  const g = parseInt(color.slice(2, 4), 16)
  const b = parseInt(color.slice(4, 6), 16)
  // ignores alpha channel
  const luma = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255
  return luma > 0.5
}
