import { getInstanceId, provideDataItem, unstable_JrRestApi } from 'scrivito'

const GENERAL_TOPIC_ID = 'general'

export const GeneralMarketingConsent = provideDataItem(
  'GeneralMarketingConsent',
  {
    async get() {
      const mySubscribedTopicIds = await fetchMySubscribedTopicIds()

      return { isConsentGiven: mySubscribedTopicIds.includes(GENERAL_TOPIC_ID) }
    },
    async update(params) {
      const { isConsentGiven } = params

      await unstable_JrRestApi.put(
        `neoletter/instances/${getInstanceId()}/my/consents/${GENERAL_TOPIC_ID}`,
        {
          data: {
            source: 'self-service portal',
            state: isConsentGiven ? 'given' : 'revoked',
          },
        },
      )

      return params
    },
  },
)

async function fetchMySubscribedTopicIds() {
  return (
    (await unstable_JrRestApi.fetch(
      `neoletter/instances/${getInstanceId()}/my/subscriptions`,
    )) as { results: { topic_id: string }[] }
  ).results.map(({ topic_id }) => topic_id)
}
