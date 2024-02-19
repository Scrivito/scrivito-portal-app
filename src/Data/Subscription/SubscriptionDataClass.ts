import {
  ClientError,
  getInstanceId,
  provideDataClass,
  unstable_JrRestApi,
} from 'scrivito'

interface Topic {
  id: string
  title: string
  description?: string
}

export const Subscription = provideDataClass('Subscription', {
  connection: {
    async index() {
      return { results: await fetchSubscriptions() }
    },
    async get(id: string) {
      return (await fetchSubscriptions()).find((sub) => sub.id === id) || null
    },
    async update(id: string, params) {
      await unstable_JrRestApi.put(
        `neoletter/instances/${getInstanceId()}/my/consents/${id}`,
        {
          data: {
            source: 'self-service portal',
            state: params.isConsentGiven ? 'given' : 'revoked',
          },
        },
      )

      return params
    },
  },
})

async function fetchSubscriptions() {
  const subscribedTopicIds = (
    sanitizeResults(
      await sanitizeProfileNotFound(() =>
        unstable_JrRestApi.fetch(
          `neoletter/instances/${getInstanceId()}/my/subscriptions`,
        ),
      ),
    ) as { results: { topic_id: string }[] }
  ).results.map(({ topic_id }) => topic_id)

  const topics = (
    sanitizeResults(
      await unstable_JrRestApi.fetch(
        `neoletter/instances/${getInstanceId()}/my/topics`,
      ),
    ) as { results: Topic[] }
  ).results

  return topics.map(({ id, description, title }) => ({
    description,
    id,
    isConsentGiven: subscribedTopicIds.includes(id),
    title,
  }))
}

/** Can be removed when the API responds as documented */
function sanitizeResults(data: unknown): { results: unknown[] } {
  return { results: (data as { results: unknown[] | null }).results || [] }
}

/** Can be removed when the API responds with a proper fallback */
function sanitizeProfileNotFound(callback: () => Promise<unknown>) {
  try {
    return callback()
  } catch (e) {
    if (
      !(e instanceof ClientError) ||
      e.code !== 'precondition_not_met.profile_not_found'
    ) {
      throw e
    }
  }
  return { results: [] }
}
