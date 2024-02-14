import { provideEditingConfig } from 'scrivito'
import { Subscription } from './SubscriptionDataClass'

provideEditingConfig(Subscription, {
  title: 'Subscription',
  attributes: {
    consent: { title: 'Consent' },
    description: { title: 'Description' },
    title: { title: 'Title' },
  },
})
