import { currentLanguage, DataAttributeDefinitions, load } from 'scrivito'
import { provideLocalStorageDataClass } from '../provideLocalStorageDataClass'

async function attributes(): Promise<DataAttributeDefinitions> {
  const lang = await load(currentLanguage)

  return {
    product: [
      'reference',
      {
        title: lang === 'de' ? 'Produkt' : 'Product',
        to: 'Product',
      },
    ],
  }
}

export const CartItem = provideLocalStorageDataClass('CartItem', { attributes })
