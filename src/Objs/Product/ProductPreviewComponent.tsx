import {
  ContentTag,
  ImageTag,
  InPlaceEditingOff,
  LinkTag,
  connect,
} from 'scrivito'
import { ProductInstance } from './ProductObjClass'
import { isProductParameterWidget } from '../../Widgets/ProductParameterWidget/ProductParameterWidgetClass'

export const ProductPreview = connect(function ProductPreview({
  product,
}: {
  product: ProductInstance
}) {
  return (
    <div className="col">
      <div className="card mb-4 bg-white">
        <LinkTag to={product}>
          <InPlaceEditingOff>
            <ImageTag
              attribute="image"
              className="img-box img-h-100"
              content={product}
              alt=""
            />

            <div className="card-body p-2">
              <ContentTag
                attribute="title"
                className="h6 text-primary mb-0"
                content={product}
                tag="h3"
              />
              <ContentTag
                attribute="subtitle"
                className="text-muted text-uppercase text-small mb-1"
                content={product}
                tag="p"
              />

              <table className="table-small m-0 table">
                <tbody>
                  {product
                    .get('parameters')
                    .filter(isProductParameterWidget)
                    .map((parameter) => (
                      <tr key={`ProductPreview-${parameter.id()}`}>
                        <th scope="row">{parameter.get('parameter')}</th>
                        <td>{parameter.get('values').join(', ')}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </InPlaceEditingOff>
        </LinkTag>
      </div>
    </div>
  )
})
