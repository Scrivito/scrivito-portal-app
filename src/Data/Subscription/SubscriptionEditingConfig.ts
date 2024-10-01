import { provideEditingConfig } from 'scrivito'
import { Subscription } from './SubscriptionDataClass'

provideEditingConfig(Subscription, {
  title: 'Subscription',
  attributes: {
    title: { title: 'Title' },
    description: { title: 'Description' },
    isConsentGiven: { title: 'Is consent given?' },
  },
})
