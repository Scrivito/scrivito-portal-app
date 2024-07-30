import { provideLocalStorageDataClass } from '../../../utils/provideLocalStorageDataClass'

export function localContractDataClass() {
  return provideLocalStorageDataClass('Contract', {
    initialContent: [
      {
        _id: '1E3039CD3CACF294E040A8C00F0177E3',
        keyword: 'Baugruppenwartung bei Maier Schmiertechnik GmbH',
        number: 'P-06.003736',
        type: 'PSA_CTR_TYP_20',
        category: 'PSA_CTR_KND_70',
        partner: 'Maier Schmiertechnik GmbH (München)',
        agent: '052601BEBCEC39C8E040A8C00D0107AC',
        internalDepartment: null,
        status: 'PSA_PRO_CTR_INI',
        startAt: '2023-11-21T08:40:38Z',
        endAt: '2035-11-20T22:59:59Z',
        minimumTerm: 12,
        minimumTermUnit: 'PSA_CTR_CYC_YEA',
        cancelationEndAt: null,
        termExtensionEndAt: null,
        totalPrice: 0,
      },
    ],
  })
}
