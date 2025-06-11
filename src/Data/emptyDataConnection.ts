import { DataConnection } from 'scrivito'

export function emptyDataConnection(_className: string): DataConnection {
  return {
    async index() {
      return { results: [], count: 0 }
    },

    async get() {
      return null
    },

    async create() {
      throw new Error(
        'There is no pisa_sales_api_url configured, so you cannot create data.',
      )
    },

    async update() {
      throw new Error(
        'There is no pisa_sales_api_url configured, so you cannot update data.',
      )
    },

    async delete() {
      throw new Error(
        'There is no pisa_sales_api_url configured, so you cannot delete data.',
      )
    },
  }
}
