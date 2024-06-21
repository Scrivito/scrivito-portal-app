import { Obj, connect } from 'scrivito'
import { isHomepage } from '../Objs/Homepage/HomepageObjClass'
import { Helmet } from 'react-helmet-async'

export const DesignAdjustments = connect(function DesignAdjustments() {
  const root = Obj.root()
  if (!isHomepage(root)) return null

  const styles: string[] = []

  const dropShadow = root.get('siteDropShadow')
  if (!dropShadow) styles.push('--jr-box-shadow: none;')

  const roundedCorners = root.get('siteRoundedCorners')
  if (!roundedCorners) styles.push('--jr-border-radius: 0;')

  return (
    <Helmet>
      {/* @ts-expect-error helmet bug: https://github.com/nfl/react-helmet/issues/344*/}
      <body style={styles.join(' ')}></body>
    </Helmet>
  )
})
