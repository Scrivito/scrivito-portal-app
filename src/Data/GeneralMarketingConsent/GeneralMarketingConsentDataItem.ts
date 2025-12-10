import {
  ClientError,
  currentLanguage,
  DataAttributeDefinitions,
  load,
  provideDataItem,
} from 'scrivito'
import { neoletterClient } from '../neoletterClient'
import { errorToast } from '../CurrentUser/errorToast'

const GENERAL_TOPIC_ID = 'general'

async function attributes(): Promise<DataAttributeDefinitions> {
  const lang = await load(() => currentLanguage())

  return {
    isConsentGiven: [
      'boolean',
      { title: lang === 'de' ? 'Zustimmung erteilt?' : 'Is consent given?' },
    ],
  }
}

export const GeneralMarketingConsent = provideDataItem(
  'GeneralMarketingConsent',
  {
    attributes,
    title: async () =>
      (await load(() => currentLanguage())) === 'de'
        ? 'Allgemeine Marketingzustimmung'
        : 'General marketing consent',
    connection: {
      async get() {
        let mySubscribedTopicIds: string[]
        try {
          mySubscribedTopicIds = await fetchMySubscribedTopicIds()
        } catch (error) {
          if (
            error instanceof ClientError &&
            error.code ===
              'precondition_not_met.neoletter_feature_not_activated'
          ) {
            return { isConsentGiven: false }
          }

          errorToast('Failed to fetch general marketing consent', error)
          throw error
        }

        return {
          isConsentGiven: mySubscribedTopicIds.includes(GENERAL_TOPIC_ID),
        }
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
  },
)

async function fetchMySubscribedTopicIds() {
  return (
    (await neoletterClient().get('my/subscriptions')) as {
      results: { topic_id: string }[]
    }
  ).results.map(({ topic_id }) => topic_id)
}
