import { snakeCase } from 'lodash-es'
import { load, Obj, urlFor } from 'scrivito'

export async function calculateUrl(
  _id: string,
  className: string,
): Promise<string> {
  const detailsPage = await load(() =>
    Obj.where('_dataParam', 'equals', className).first(),
  )
  return detailsPage
    ? urlFor(detailsPage, { query: `${snakeCase(className)}_id=${_id}` })
    : ''
}
