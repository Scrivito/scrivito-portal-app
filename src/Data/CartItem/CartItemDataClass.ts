import {
  currentLanguage,
  DataAttributeDefinitions,
  load,
  provideDataClass,
} from 'scrivito'
import { localStorageDataConnection } from '../localStorageDataConnection'

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
    quantity: ['number', { title: lang === 'de' ? 'Menge' : 'Quantity' }],
  }
}

export const CartItem = provideDataClass('CartItem', {
  attributes,
  title: async () =>
    (await load(currentLanguage)) === 'de' ? 'Warenkorb-Element' : 'Cart item',
  connection: localStorageDataConnection('CartItem'),
})
