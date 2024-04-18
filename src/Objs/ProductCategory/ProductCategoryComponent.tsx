import { ContentTag, connect, provideComponent } from 'scrivito'
import {
  ProductCategory,
  ProductCategoryInstance,
} from './ProductCategoryObjClass'
import { isProduct } from '../Product/ProductObjClass'
import { ProductPreview } from '../Product/ProductPreviewComponent'

provideComponent(ProductCategory, ({ page }) => {
  const products = page.orderedChildren().filter(isProduct)

  return (
    <section className="bg-light-grey py-4">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <h3>
              <ContentTag tag="span" content={page} attribute="headline" />
              {' - '}
              {page.get('title')}
            </h3>
            <p>
              <TotalCountSummary page={page} totalCount={products.length} />
            </p>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-3 my-3">
              {products.map((product) => (
                <ProductPreview
                  product={product}
                  key={`ProductCategory-${page.id()}-${product.id()}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
})

const TotalCountSummary = connect(function TotalCountSummary({
  totalCount,
  page,
}: {
  totalCount: number
  page: ProductCategoryInstance
}) {
  const attributes = ['resultsHeadline0', 'resultsHeadline1'] as const
  const attribute = attributes[totalCount] || 'resultsHeadline'

  return (
    <ContentTag
      tag="span"
      content={page}
      attribute={attribute}
      dataContext={{ count: totalCount.toString() }}
    />
  )
})
