import { provideDataClass } from 'scrivito'

export const Rocket = provideDataClass('Rocket', {
  connection: {
    async index(params) {
      const response = await fetch('https://api.spacexdata.com/v4/rockets/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: params.filters(),
          options: { sort: params.order(), select: 'id' },
        }),
      })
      const json = await response.json()
      return { results: json.docs.map((data: { id: string }) => data.id) }
    },

    async get(id) {
      const response = await fetch(`https://api.spacexdata.com/v4/rockets/${id}`)
      if (!response.ok) return null
      const json = await response.json()
      return { ...json, image: json.flickr_images[0] }
    },
  },
})
