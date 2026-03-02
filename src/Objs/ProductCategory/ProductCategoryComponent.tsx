import { currentLanguage, provideComponent } from 'scrivito'
import { ProductCategory } from './ProductCategoryObjClass'
import { isProduct } from '../Product/ProductObjClass'
import { ProductPreview } from '../Product/ProductPreviewComponent'
import messages from './i18n.visitor.json'
import rosetta from 'rosetta'

const i18n = rosetta(messages)
const lang = currentLanguage() ?? 'en'
i18n.locale(lang in messages ? lang : 'en')

provideComponent(ProductCategory, ({ page }) => {
  const products = page.orderedChildren().filter(isProduct)

  const count = products.length
  const itemsLocalizer: 'items0' | 'items1' | 'itemsMany' =
    (['items0', 'items1'] as const)[count] || 'itemsMany'

  return (
    <main id="main">
      <section className="bg-light-grey py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h3>
                {i18n.t('headline')} - {page.get('title')}
              </h3>
              <p>
                {i18n.t(itemsLocalizer).replace('{count}', count.toString())}
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
    </main>
  )
})
