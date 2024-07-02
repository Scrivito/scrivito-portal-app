import {
  ContentTag,
  ImageTag,
  InPlaceEditingOff,
  LinkTag,
  provideComponent,
} from 'scrivito'
import { ProductsOverview } from './ProductsOverviewObjClass'
import { isProductCategory } from '../ProductCategory/ProductCategoryObjClass'

provideComponent(ProductsOverview, ({ page }) => {
  const categories = page.orderedChildren().filter(isProductCategory)

  return (
    <main id="main">
      <section className="py-2">
        <div className="container">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 my-3">
            <InPlaceEditingOff>
              {categories.map((category) => (
                <div className="col" key={`ProductsOverview-${category.id()}`}>
                  <div className="card mb-4 bg-primary">
                    <LinkTag to={category}>
                      <ImageTag
                        content={category}
                        attribute="image"
                        className="img-box img-h-200"
                      />
                      <div className="card-body p-2">
                        <ContentTag
                          content={category}
                          attribute="title"
                          tag="h3"
                          className="h5 text-center m-0"
                        />
                        <ContentTag
                          content={category}
                          attribute="description"
                          tag="p"
                          className="small text-center m-0"
                        />
                      </div>
                    </LinkTag>
                  </div>
                </div>
              ))}
            </InPlaceEditingOff>
          </div>
        </div>
      </section>
      <ContentTag content={page} attribute="body" />
    </main>
  )
})
