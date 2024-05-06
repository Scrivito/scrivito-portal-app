import { provideComponent } from 'scrivito'
import { ProductCategory } from './ProductCategoryObjClass'
import { isProduct } from '../Product/ProductObjClass'
import { ProductPreview } from '../Product/ProductPreviewComponent'
import { getCurrentLanguage } from '../../utils/currentLanguage'

provideComponent(ProductCategory, ({ page }) => {
  const products = page.orderedChildren().filter(isProduct)

  const count = products.length
  const itemsLocalizer = (['items0', 'items1'] as const)[count] || 'itemsMany'

  return (
    <section className="bg-light-grey py-4">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <h3>
              {getLocalizer('headline')} - {page.get('title')}
            </h3>
            <p>
              {getLocalizer(itemsLocalizer).replace(
                '__count__',
                count.toString(),
              )}
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

function getLocalizer(localizer: keyof (typeof LOCALIZERS)['en']) {
  const currentLanguage = getCurrentLanguage()
  const localizers = isLocalizersKey(currentLanguage)
    ? LOCALIZERS[currentLanguage]
    : LOCALIZERS['en']
  return localizers[localizer]
}

function isLocalizersKey(key?: PropertyKey): key is keyof typeof LOCALIZERS {
  return !!key && key in LOCALIZERS
}

const LOCALIZERS = {
  de: {
    headline: 'Produktgruppe',
    items0: 'Keine Artikel',
    items1: '1 Artikel',
    itemsMany: '__count__ Artikel',
  },
  en: {
    headline: 'Product category',
    items0: 'No items',
    items1: '1 item',
    itemsMany: '__count__ items',
  },
}
