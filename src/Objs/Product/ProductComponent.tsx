import {
  ContentTag,
  ImageTag,
  connect,
  isUserLoggedIn,
  provideComponent,
} from 'scrivito'
import { toast } from 'react-toastify'
import { Product, ProductInstance, isProduct } from './ProductObjClass'
import {
  isProductParameterWidget,
  toPlainParameter,
} from '../../Widgets/ProductParameterWidget/ProductParameterWidgetClass'
import { ProductPreview } from './ProductPreviewComponent'
import { addToCart, isInCart, removeFromCart } from '../../Data/CartItem/Cart'

provideComponent(Product, ({ page }) => {
  const plainParameters = page
    .get('parameters')
    .filter(isProductParameterWidget)
    .map(toPlainParameter)

  return (
    <>
      <section className="py-4">
        <div className="container">
          <div className="row align-items-stretch">
            <div className="col-md-4 mb-4">
              <div className="card h-100 py-5">
                <ImageTag
                  content={page}
                  attribute="image"
                  className="img-background"
                />
              </div>
            </div>

            <div className="col-md-8 mb-4">
              <div className="card mb-4">
                <div className="card-body p-4">
                  <ContentTag
                    content={page}
                    attribute="title"
                    className="h3 mb-0 text-primary"
                    tag="h3"
                  />

                  <ContentTag
                    content={page}
                    attribute="subtitle"
                    className="mb-1 text-muted text-uppercase"
                    tag="p"
                  />

                  <CartActionButton product={page} />

                  <ul className="nav nav-pills">
                    <li className="nav-item">
                      <a className="nav-link" href="#description">
                        Description
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#data">
                        Data
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#downloads">
                        Downloads
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#accessories">
                        Suitable accessories
                      </a>
                    </li>
                  </ul>

                  {plainParameters
                    .filter(({ values }) => values.length > 1)
                    .map(({ parameter, values }) => (
                      <div
                        key={`Product-ProductParameters-${page.id()}-${parameter}`}
                      >
                        <hr />
                        <h3 className="h6">{parameter}</h3>
                        {values.map((valueOption) => (
                          <span
                            key={`Product-ProductParameters-${page.id()}-${parameter}-${valueOption}`}
                          >
                            <div
                              className="btn btn-sm btn-outline-primary disabled"
                              style={{
                                opacity: '100%', // TODO: Add official styling by designer
                              }}
                            >
                              {valueOption}
                            </div>{' '}
                          </span>
                        ))}
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <h3 className="h4" id="description">
            Description
          </h3>
          <ContentTag content={page} attribute="descriptionSection" />
        </div>
      </section>
      <section className="py-4">
        <div className="container">
          <h3 className="h4" id="data">
            Data
          </h3>
          <div className="row">
            <div className="col-md-6">
              <table className="table table-hover table-small m-0">
                <tbody>
                  {plainParameters.map(({ parameter, values }) => (
                    <tr key={`Product-${page.id()}-${parameter}`}>
                      <th scope="row">{parameter}</th>
                      <td>{values.join(', ')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <ContentTag
              className="col-md-6"
              content={page}
              attribute="dataSection"
            />
          </div>
        </div>
      </section>
      <section className="bg-light-grey py-4">
        <div className="container">
          <h3 className="h4" id="downloads">
            Downloads
          </h3>

          <ContentTag content={page} attribute="downloadsSection" />
        </div>
      </section>
      <section className="py-4">
        <div className="container">
          <h3 className="h4" id="accessories">
            Suitable accessories
          </h3>

          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-3 my-3">
            {page
              .get('suitableAccessories')
              .filter(isProduct)
              .map((suitableAccessory) => (
                <ProductPreview
                  product={suitableAccessory}
                  key={`suitableAccessory-${page.id()}-${suitableAccessory.id()}`}
                />
              ))}
          </div>
        </div>
      </section>
    </>
  )
})

const CartActionButton = connect(function CartActionButton({
  product,
}: {
  product: ProductInstance
}) {
  const productTitle = product.get('title')

  if (!isUserLoggedIn()) {
    return (
      <button
        className="btn btn-sm btn-primary disabled"
        style={{ pointerEvents: 'auto' }}
        title={`Please log in to add "${productTitle}" to cart.`}
      >
        Add to cart
      </button>
    )
  }

  if (isInCart(product)) {
    return (
      <button
        className="btn btn-sm btn-primary"
        onClick={() => {
          removeFromCart(product)
          toast.info(`Removed "${productTitle}" from cart.`)
        }}
      >
        Remove from cart
      </button>
    )
  }

  return (
    <button
      className="btn btn-sm btn-primary"
      onClick={async () => {
        await addToCart(product)
        toast.success(`Added "${productTitle}" to cart.`)
      }}
    >
      Add to cart
    </button>
  )
})
