import { provideEditingConfig } from 'scrivito'
import { Subscription } from './SubscriptionDataClass'

provideEditingConfig(Subscription, {
  title: 'Subscription',
  attributes: {
    description: { title: 'Description' },
    isConsentGiven: { title: 'Consent given?' },
    title: { title: 'Title' },
  },
})
