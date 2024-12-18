import { currentLanguage, provideComponent } from 'scrivito'
import { ProductCategory } from './ProductCategoryObjClass'
import { isProduct } from '../Product/ProductObjClass'
import { ProductPreview } from '../Product/ProductPreviewComponent'

provideComponent(ProductCategory, ({ page }) => {
  const products = page.orderedChildren().filter(isProduct)

  const count = products.length
  const itemsLocalizer = (['items0', 'items1'] as const)[count] || 'itemsMany'

  return (
    <main id="main">
      <section className="bg-light-grey py-5">
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
    </main>
  )
})

function getLocalizer(localizer: keyof (typeof LOCALIZERS)['en']) {
  const language = currentLanguage()
  const localizers = isLocalizersKey(language)
    ? LOCALIZERS[language]
    : LOCALIZERS['en']
  return localizers[localizer]
}

function isLocalizersKey(
  key?: PropertyKey | null,
): key is keyof typeof LOCALIZERS {
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
  fr: {
    headline: 'Catégorie de produit',
    items0: 'Aucun article',
    items1: '1 article',
    itemsMany: '__count__ articles',
  },
  pl: {
    headline: 'Kategoria produktu',
    items0: 'Brak produktów',
    items1: '1 produkt',
    itemsMany: 'Liczba produktów: __count__',
  },
}
