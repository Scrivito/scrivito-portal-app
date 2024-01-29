import { provideComponent } from 'scrivito'
import { ProductCategory } from './ProductCategoryObjClass'
import { isProduct } from '../Product/ProductObjClass'
import { ProductPreview } from '../Product/ProductPreviewComponent'
import { pluralize } from '../../utils/pluralize'

provideComponent(ProductCategory, ({ page }) => {
  const products = page.orderedChildren().filter(isProduct)

  return (
    <section className="bg-light-grey py-4">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <h3>Product category - {page.get('title')}</h3>
            <p>{pluralize(products.length, 'item')}</p>
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
