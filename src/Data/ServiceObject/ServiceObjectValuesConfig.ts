import {
  provideDataValues,
  provideAttributeLocalizers,
} from '../../utils/dataValuesConfig'
import { ServiceObject } from './ServiceObjectDataClass'

provideDataValues(ServiceObject, {
  locationCountry: ['DEU', 'GBR'],
  status: ['PSA_ART_SVC_ACT', 'PSA_ART_SVC_CLS'],
})

provideAttributeLocalizers(ServiceObject, {
  locationCountry: {
    DEU: 'Germany',
    GBR: 'United Kingdom',
  },
  status: {
    PSA_ART_SVC_ACT: 'active',
    PSA_ART_SVC_CLS: 'inactive',
  },
})
