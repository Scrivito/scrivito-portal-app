import { provideEditingConfig } from 'scrivito'
import { Subscription } from './SubscriptionDataClass'

provideEditingConfig(Subscription, {
  title: 'Subscription',
  attributes: {
    _id: { title: 'Subscription ID' },
    title: { title: 'Title' },
    description: { title: 'Description' },
    isConsentGiven: { title: 'Is consent given?' },
  },
})
