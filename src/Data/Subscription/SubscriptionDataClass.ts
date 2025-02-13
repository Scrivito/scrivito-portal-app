import { currentLanguage, load, provideDataClass } from 'scrivito'
import { neoletterClient } from '../neoletterClient'
import { filterDataItems } from '../filterDataItems'
import { orderDataItems } from '../orderDataItems'

interface Topic {
  id: string
  title: string
  description?: string
}

export const Subscription = provideDataClass('Subscription', {
  attributes: async () => {
    const lang = await load(currentLanguage)

    return {
      description: [
        'string',
        { title: lang === 'de' ? 'Beschreibung' : 'Description' },
      ],
      isConsentGiven: [
        'boolean',
        {
          title:
            lang === 'de' ? 'Einverständnis gegeben?' : 'Is consent given?',
        },
      ],
      title: ['string', { title: lang === 'de' ? 'Titel' : 'Title' }],
    }
  },
  connection: {
    async index(params) {
      if (params.search()) {
        throw new Error('Searching is not supported for subscriptions.')
      }

      const subscriptions = await fetchSubscriptions()

      const filteredSubscriptions = filterDataItems(
        params.filters(),
        subscriptions,
      )

      const orderedSubscriptions = orderDataItems(
        params.order(),
        filteredSubscriptions,
      )

      return {
        results: orderedSubscriptions.slice(0, params.limit()),
        count: orderedSubscriptions.length,
      }
    },
    async get(id: string) {
      return (await fetchSubscriptions()).find((sub) => sub._id === id) || null
    },
    async update(id: string, params) {
      await neoletterClient().put(`my/consents/${id}`, {
        data: {
          source: 'self-service portal',
          state: params.isConsentGiven ? 'given' : 'revoked',
        },
      })

      return params
    },
  },
})

async function fetchSubscriptions() {
  const subscribedTopicIds = (
    (await neoletterClient().get('my/subscriptions')) as {
      results: { topic_id: string }[]
    }
  ).results.map(({ topic_id }) => topic_id)

  const topics = (
    (await neoletterClient().get('my/topics')) as { results: Topic[] }
  ).results

  return topics.map(({ id, description, title }) => ({
    description,
    _id: id,
    isConsentGiven: subscribedTopicIds.includes(id),
    title,
  }))
}
