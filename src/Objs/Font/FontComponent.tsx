import { connect, Obj } from 'scrivito'
import { Helmet } from 'react-helmet-async'
import { isFont } from './FontObjClass'

export const FontComponent = connect(
  function FontComponent({ page }: { page: Obj }) {
    if (!isFont(page)) return null

    const family = CSS.escape(page.get('family'))
    if (!family) return null

    const fontUrl = page.get('blob')?.url()
    if (!fontUrl) return null

    const weight = page.get('weight')

    return (
      <Helmet>
        <style type="text/css">{`
        @font-face {
          font-family: '${family}';
          font-display: swap;
          src: url('${fontUrl}');
          ${weight ? `font-weight: ${weight};` : ''}
        }
      `}</style>
      </Helmet>
    )
  },
  { loading: () => null },
)
