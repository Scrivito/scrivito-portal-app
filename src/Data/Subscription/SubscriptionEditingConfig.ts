import { provideEditingConfig } from 'scrivito'
import { Subscription } from './SubscriptionDataClass'

provideEditingConfig(Subscription, {
  title: 'Subscription',
  attributes: {
    // TODO: Remove the following attributes, once #11338 is resolved:
    description: { title: 'Description' },
    isConsentGiven: { title: 'Is consent given?' },
    title: { title: 'Title' },
  },
})
