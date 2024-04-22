import {
  provideDataValues,
  provideAttributeLocalizers,
} from '../../utils/dataValuesConfig'
import { Event } from './EventDataClass'

provideDataValues(Event, {
  language: ['ENG', 'FRA', 'GER', 'ITA', 'SPA'],
  status: [
    'PSA_PRO_EVT_BRK',
    'PSA_PRO_EVT_CLS',
    'PSA_PRO_EVT_CNL',
    'PSA_PRO_EVT_EXE',
    'PSA_PRO_EVT_PRE',
    'PSA_PRO_EVT_PRP',
    'PSA_PRO_EVT_REG_CLS',
    'PSA_PRO_EVT_REG_OPN',
    'PSA_PRO_EVT_REW',
    'PSA_PRO_EVT_WRK',
  ],
})

provideAttributeLocalizers('de', Event, {
  language: {
    ENG: 'Englisch',
    FRA: 'Französisch',
    GER: 'Deutsch',
    ITA: 'Italienisch',
    SPA: 'Spanisch',
  },
  status: {
    PSA_PRO_EVT_BRK: 'unterbrochen',
    PSA_PRO_EVT_CLS: 'abgeschlossen',
    PSA_PRO_EVT_CNL: 'vorzeitig abgebrochen',
    PSA_PRO_EVT_EXE: 'Durchführung',
    PSA_PRO_EVT_PRE: 'geplant',
    PSA_PRO_EVT_PRP: 'in Vorbereitung',
    PSA_PRO_EVT_REG_CLS: 'Anmeldephase geschlossen',
    PSA_PRO_EVT_REG_OPN: 'Anmeldephase offen',
    PSA_PRO_EVT_REW: 'in Nachbearbeitung',
    PSA_PRO_EVT_WRK: 'in Arbeit',
  },
})

provideAttributeLocalizers('en', Event, {
  language: {
    ENG: 'English',
    FRA: 'French',
    GER: 'German',
    ITA: 'Italian',
    SPA: 'Spanish',
  },
  status: {
    PSA_PRO_EVT_BRK: 'broken',
    PSA_PRO_EVT_CLS: 'finished',
    PSA_PRO_EVT_CNL: 'cancelled early',
    PSA_PRO_EVT_EXE: 'execution',
    PSA_PRO_EVT_PRE: 'planned',
    PSA_PRO_EVT_PRP: 'in preparation',
    PSA_PRO_EVT_REG_CLS: 'registration closed',
    PSA_PRO_EVT_REG_OPN: 'registration open',
    PSA_PRO_EVT_REW: 'in postprocess',
    PSA_PRO_EVT_WRK: 'in progress',
  },
})
