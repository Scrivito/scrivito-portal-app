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
import { getCurrentLanguage } from '../../utils/currentLanguage'

provideComponent(Product, ({ page }) => {
  const plainParameters = page
    .get('parameters')
    .filter(isProductParameterWidget)
    .map(toPlainParameter)

  return (
    <>
      <section className="bg-light-grey py-4">
        <div className="container">
          <div className="row align-items-stretch">
            <div className="col-md-4 mb-4">
              <div className="card h-100">
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

                  <ul className="nav nav-underline">
                    <li className="nav-item">
                      <a className="nav-link" href="#description">
                        <Label localizer="description" />
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#data">
                        <Label localizer="data" />
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#downloads">
                        <Label localizer="downloads" />
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#accessories">
                        <Label localizer="suitableAccessories" />
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
          <Label
            tag="h3"
            className="h4"
            id="description"
            localizer="description"
          />
          <ContentTag content={page} attribute="descriptionSection" />
        </div>
      </section>
      <section className="py-4">
        <div className="container">
          <Label tag="h3" className="h4" id="data" localizer="data" />
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
          <Label tag="h3" className="h4" id="downloads" localizer="downloads" />
          <ContentTag content={page} attribute="downloadsSection" />
        </div>
      </section>
      <section className="bg-primary py-4">
        <div className="container">
          <Label
            tag="h3"
            className="h4"
            id="accessories"
            localizer="suitableAccessories"
          />
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

  function getMessage(attribute: string) {
    return getLocalizer(attribute).replaceAll('__product__', productTitle)
  }

  const cartAddedMessage = getMessage('cartAddedMessage')
  const cartAddLabel = getMessage('cartAddLabel')
  const cartRemovedMessage = getMessage('cartRemovedMessage')
  const cartRemoveLabel = getMessage('cartRemoveLabel')
  const cartUnvailableMessage = getMessage('cartUnvailableMessage')

  if (!isUserLoggedIn()) {
    return (
      <button
        className="btn btn-sm btn-primary disabled"
        style={{ pointerEvents: 'auto' }}
        title={cartUnvailableMessage}
      >
        <i className="bi bi-cart"></i>
        {cartAddLabel}
      </button>
    )
  }

  if (isInCart(product)) {
    return (
      <button
        className="btn btn-sm btn-primary"
        onClick={() => {
          removeFromCart(product)
          toast.info(cartRemovedMessage)
        }}
      >
        <i className="bi bi-x-lg"></i>
        {cartRemoveLabel}
      </button>
    )
  }

  return (
    <button
      className="btn btn-sm btn-primary"
      onClick={async () => {
        await addToCart(product)
        toast.success(cartAddedMessage)
      }}
    >
      <i className="bi bi-cart"></i>
      {cartAddLabel}
    </button>
  )
})

const Label = connect(function Label({
  className,
  id,
  localizer,
  tag,
}: {
  className?: string
  id?: string
  localizer: keyof (typeof LOCALIZERS)['en']
  tag?: 'h3'
}) {
  const Tag = tag || 'span'

  return (
    <Tag className={className} id={id}>
      {getLocalizer(localizer)}
    </Tag>
  )
})

function getLocalizer(localizer: keyof (typeof LOCALIZERS)['en']): string {
  const currentLanguage = getCurrentLanguage() || 'en'
  const localizers = LOCALIZERS[currentLanguage] || LOCALIZERS['en']
  return localizers[localizer] || localizer
}

const LOCALIZERS: Record<string, Record<string, string>> &
  Record<'en', Record<string, string>> = {
  de: {
    cartAddedMessage: '__product__ wurde dem Warenkorb hinzugefügt.',
    cartAddLabel: 'In den Warenkorb',
    cartRemovedMessage: '__product__ wurde aus dem Warenkorb entfernt.',
    cartRemoveLabel: 'Aus dem Warenkorb entfernen',
    cartUnvailableMessage:
      'Bitte melden Sie sich an, um __product__ zum Warenkorb hinzuzufügen.',
    data: 'Daten',
    description: 'Beschreibung',
    downloads: 'Downloads',
    suitableAccessories: 'Passendes Zubehör',
  },
  en: {
    cartAddedMessage: 'Added __product__ to cart.',
    cartAddLabel: 'Add to cart',
    cartRemovedMessage: 'Removed __product__ from cart.',
    cartRemoveLabel: 'Remove from cart',
    cartUnvailableMessage: 'Please log in to add __product__ to cart.',
    data: 'Data',
    description: 'Description',
    downloads: 'Downloads',
    suitableAccessories: 'Suitable accessories',
  },
}
