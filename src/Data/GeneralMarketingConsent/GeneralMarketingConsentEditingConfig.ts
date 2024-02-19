import { provideEditingConfig } from 'scrivito'
import { GeneralMarketingConsent } from './GeneralMarketingConsentDataItem'

provideEditingConfig(GeneralMarketingConsent, {
  title: 'General marketing consent',
  attributes: {
    isConsentGiven: { title: 'Is consent given?' },
  },
})
