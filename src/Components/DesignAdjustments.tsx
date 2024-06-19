import { Obj, connect } from 'scrivito'
import { isHomepage } from '../Objs/Homepage/HomepageObjClass'
import { Helmet } from 'react-helmet-async'

export const DesignAdjustments = connect(function DesignAdjustments() {
  const root = Obj.root()
  if (!isHomepage(root)) return null

  const styles: string[] = []

  const dropShadow = root.get('siteDropShadow')
  styles.push(
    `--jr-card-box-shadow: ${
      dropShadow ? '0 0.375rem 1.5rem 0 rgba(140, 152, 164, 0.25)' : 'none'
    };`,
  )

  const roundedCorners = root.get('siteRoundedCorners')
  styles.push(`--jr-card-border-radius: ${roundedCorners ? '0.5rem' : '0'};`)

  return (
    <Helmet>
      {/* @ts-expect-error helmet bug: https://github.com/nfl/react-helmet/issues/344*/}
      <body style={styles.join('\n')}></body>
    </Helmet>
  )
})
