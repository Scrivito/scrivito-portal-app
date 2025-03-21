import {
  ContentTag,
  ImageTag,
  connect,
  currentLanguage,
  ensureUserIsLoggedIn,
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
import {
  quantityInCart,
  removeFromCart,
  updateQuantityInCart,
} from '../../Data/CartItem/Cart'
import { useCallback, useRef } from 'react'

provideComponent(Product, ({ page }) => {
  const plainParameters = page
    .get('parameters')
    .filter(isProductParameterWidget)
    .map(toPlainParameter)

  return (
    <main id="main">
      <section className="bg-light-grey py-5">
        <div className="container">
          <div className="row align-items-stretch">
            <div className="col-md-4 mb-4">
              <div className="card h-100">
                <ImageTag
                  content={page}
                  attribute="image"
                  className="img-background"
                  alt=""
                />
              </div>
            </div>

            <div className="col-md-8 mb-4">
              <div className="card">
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
      <section className="py-5">
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
      <section className="bg-light-grey py-5">
        <div className="container">
          <Label tag="h3" className="h4" id="downloads" localizer="downloads" />
          <ContentTag content={page} attribute="downloadsSection" />
        </div>
      </section>
      <section className="bg-primary py-5">
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
    </main>
  )
})

const CartActionButton = connect(function CartActionButton({
  product,
}: {
  product: ProductInstance
}) {
  const inputRef = useRef<HTMLInputElement>(null)

  const onChange = useCallback(() => {
    inputRef.current?.reportValidity()
    const quantity = Math.floor(Number(inputRef.current?.value))
    if (quantity > 0) updateQuantityInCart(product, quantity)
  }, [inputRef, product])

  const down = useCallback(() => {
    inputRef.current?.stepDown()
    onChange()
  }, [inputRef, onChange])

  const up = useCallback(() => {
    inputRef.current?.stepUp()
    onChange()
  }, [inputRef, onChange])

  const productTitle = product.get('title')

  function getMessage(attribute: keyof (typeof LOCALIZERS)['en']) {
    return getLocalizer(attribute).replaceAll('__product__', productTitle)
  }

  const cartAddedMessage = getMessage('cartAddedMessage')
  const cartAddLabel = getMessage('cartAddLabel')
  const cartRemovedMessage = getMessage('cartRemovedMessage')
  const cartRemoveLabel = getMessage('cartRemoveLabel')
  const cartLoginLabel = getMessage('cartLoginLabel')
  const cartUnavailableMessage = getMessage('cartUnavailableMessage')
  const quantityLabel = getMessage('quantityLabel')

  if (!isUserLoggedIn()) {
    return (
      <button
        className="btn btn-sm btn-outline-primary"
        title={cartUnavailableMessage}
        onClick={ensureUserIsLoggedIn}
      >
        <i className="bi bi-cart"></i>
        {cartLoginLabel}
      </button>
    )
  }

  const quantity = quantityInCart(product)
  if (quantity) {
    return (
      <div className="row mt-0 mb-1 g-1">
        <div className="col-4 col-sm-3 col-md-3 col-xl-2">
          <div className="input-group input-group-sm">
            <button
              aria-label="-"
              className="btn btn-primary"
              disabled={quantity < 2}
              onClick={down}
            >
              <i className="bi bi-dash-lg px-0" />
            </button>
            <input
              className="form-control text-center no-arrows"
              defaultValue={quantity}
              min={1}
              onChange={onChange}
              ref={inputRef}
              step={1}
              title={quantityLabel}
              type="number"
            />
            <button aria-label="+" className="btn btn-primary" onClick={up}>
              <i className="bi bi-plus-lg px-0" />
            </button>
          </div>
        </div>
        <div className="col-auto">
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
        </div>
      </div>
    )
  }

  return (
    <button
      className="btn btn-sm btn-primary my-1"
      onClick={async () => {
        await updateQuantityInCart(product, 1)
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
    cartAddedMessage: '__product__ wurde dem Warenkorb hinzugefügt.',
    cartAddLabel: 'In den Warenkorb',
    cartRemovedMessage: '__product__ wurde aus dem Warenkorb entfernt.',
    cartRemoveLabel: 'Aus dem Warenkorb entfernen',
    cartLoginLabel: 'Anmelden',
    cartUnavailableMessage:
      'Bitte melden Sie sich an, um __product__ zum Warenkorb hinzuzufügen.',
    data: 'Daten',
    description: 'Beschreibung',
    downloads: 'Downloads',
    quantityLabel: 'Anzahl',
    suitableAccessories: 'Passendes Zubehör',
  },
  en: {
    cartAddedMessage: 'Added __product__ to cart.',
    cartAddLabel: 'Add to cart',
    cartRemovedMessage: 'Removed __product__ from cart.',
    cartRemoveLabel: 'Remove from cart',
    cartLoginLabel: 'Log in',
    cartUnavailableMessage: 'Please log in to add __product__ to cart.',
    data: 'Data',
    description: 'Description',
    downloads: 'Downloads',
    quantityLabel: 'Quantity',
    suitableAccessories: 'Suitable accessories',
  },
  fr: {
    cartAddedMessage: '__product__ a été ajouté au panier.',
    cartAddLabel: 'Ajouter au panier',
    cartRemovedMessage: '__product__ a été retiré du panier.',
    cartRemoveLabel: 'Retirer du panier',
    cartLoginLabel: 'Se connecter',
    cartUnavailableMessage:
      'Veuillez vous connecter pour ajouter __product__ dans le panier.',
    data: 'Données',
    description: 'Description',
    downloads: 'Téléchargements',
    quantityLabel: 'Quantité',
    suitableAccessories: 'Accessoires appropriés',
  },
  pl: {
    cartAddedMessage: '__product__ został dodany do koszyka.',
    cartAddLabel: 'Dodaj do koszyka',
    cartRemovedMessage: '__product__ został usunięty z koszyka.',
    cartRemoveLabel: 'Usuń z koszyka',
    cartLoginLabel: 'Zaloguj się',
    cartUnavailableMessage: 'Zaloguj się, aby dodać __product__ do koszyka.',
    data: 'Dane',
    description: 'Opis',
    downloads: 'Pobrania',
    quantityLabel: 'Ilość',
    suitableAccessories: 'Odpowiednie akcesoria',
  },
}
