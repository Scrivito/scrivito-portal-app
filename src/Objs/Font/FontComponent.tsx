import { connect, Obj } from 'scrivito'
import { Helmet } from 'react-helmet-async'
import { isFont } from './FontObjClass'

// FontComponent is rendered via the DesignAdjustments component
export const FontComponent = connect(
  function FontComponent({ page }: { page: Obj }) {
    if (!isFont(page)) return null

    const family = CSS.escape(page.get('family'))
    if (!family) return null

    const weight = page.get('weight')
    if (!weight) return null

    const imageUrl = page.get('blob')?.url()
    if (!imageUrl) return null

    const format = 'woff2'

    const src = ["local('')"]
    if (page.get('variations')) {
      src.push(`url('${imageUrl}') format('${format}') tech('variations')`)
      src.push(`url('${imageUrl}') format('${format}-variations')`)
    } else {
      src.push(`url('${imageUrl}') format('${format}')`)
    }

    return (
      <Helmet>
        <style type="text/css">{`
        @font-face {
          font-family: '${family}';
          font-display: swap;
          src: ${src.join(', ')};
          font-weight: ${weight};
        }
      `}</style>
      </Helmet>
    )
  },
  { loading: () => null },
)
