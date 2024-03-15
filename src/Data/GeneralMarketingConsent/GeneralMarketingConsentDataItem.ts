import { provideDataItem } from 'scrivito'
import { neoletterClient } from '../neoletterClient'

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

      await neoletterClient().put(`my/consents/${GENERAL_TOPIC_ID}`, {
        data: {
          source: 'self-service portal',
          state: isConsentGiven ? 'given' : 'revoked',
        },
      })

      return params
    },
  },
)

async function fetchMySubscribedTopicIds() {
  return (
    (await neoletterClient().get('my/subscriptions')) as {
      results: { topic_id: string }[]
    }
  ).results.map(({ topic_id }) => topic_id)
}
