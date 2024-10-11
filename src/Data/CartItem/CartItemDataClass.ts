import { currentLanguage, load } from 'scrivito'
import { provideLocalStorageDataClass } from '../provideLocalStorageDataClass'
import { DataClassSchema } from '../types'

async function attributes(): Promise<DataClassSchema> {
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
