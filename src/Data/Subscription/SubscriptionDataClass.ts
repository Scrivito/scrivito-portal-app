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
      const myTopics = (
        sanitizeResults(
          await unstable_JrRestApi.fetch(
            `neoletter/instances/${getInstanceId()}/my/topics`,
          ),
        ) as { results: Topic[] }
      ).results

      const mySubscribedTopicIds = await fetchMySubscribedTopicIds()

      return {
        results: myTopics.map(({ id, description, title }) => ({
          id,
          isConsentGiven: mySubscribedTopicIds.includes(id),
          description,
          title,
        })),
      }
    },
    async get(id: string) {
      const topic = (await unstable_JrRestApi.fetch(
        `neoletter/instances/${getInstanceId()}/topics/${id}`,
      )) as Topic

      const mySubscribedTopicIds = await fetchMySubscribedTopicIds()

      return {
        ...topic,
        isConsentGiven: mySubscribedTopicIds.includes(topic.id),
      }
    },
    async update(id: string, params) {
      const { isConsentGiven } = params
      return unstable_JrRestApi.put(
        `neoletter/instances/${getInstanceId()}/my/consents/${id}`,
        {
          data: {
            source: 'self-service portal',
            state: isTrue(isConsentGiven) ? 'given' : 'revoked',
          },
        },
      )
    },
  },
})

function isTrue(value: unknown) {
  return value === true || value === 'true'
}

async function fetchMySubscribedTopicIds() {
  return (
    sanitizeResults(
      await sanitizeProfileNotFound(() =>
        unstable_JrRestApi.fetch(
          `neoletter/instances/${getInstanceId()}/my/subscriptions`,
        ),
      ),
    ) as { results: { topic_id: string }[] }
  ).results.map(({ topic_id }) => topic_id)
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
