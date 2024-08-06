import { provideLocalStorageDataClass } from '../../../utils/provideLocalStorageDataClass'
import penImage from './FakeBinaries/pen.jpg'
import kmkPdf from './FakeBinaries/KMK-overview_(Karlsruhe_Exhibition_Centre).pdf'
import orderPdf from './FakeBinaries/ORDER.pdf'
import { DataClassAttributes } from '../../types'

export function localStorageDocumentDataClass(attributes: DataClassAttributes) {
  return provideLocalStorageDataClass('Document', {
    attributes,
    initialContent: [
      {
        _id: '29FE46BEE85B44E58350F2828C820E74',
        title: 'An image',
        number: 'D-24-005386',
        type: 'PSA_INF',
        format: 'jpeg',
        createdAt: '2024-01-26T10:02:27Z',
        language: 'ENG',
        size: 0.091,
        version: '0.0',
        body: {
          _id: '00000010444f43554d454e54000000403239464534364245453835423434453538333530463238323843383230453734',
          filename: '_3e84ec39-792f-4868-a65c-7109c0edd1c5 (2).jpeg',
          contentType: 'image/jpeg',
          url: penImage,
          contentLength: 95420,
        },
      },
      {
        _id: 'C2F7FC428765451EBF4CB05EA70256BF',
        title: 'Test - P-20-009128',
        number: 'D-20-005337',
        type: 'PSA_SPC_LNG',
        format: 'docx',
        createdAt: '2020-04-21T12:59:38Z',
        language: 'GER',
        size: 0.599,
        version: '0.0',
        body: {
          url: orderPdf,
          _id: '00000010444f43554d454e54000000404332463746433432383736353435314542463443423035454137303235364246',
          filename: 'Test - P-20-009128.docx',
          contentType:
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          contentLength: 628097,
        },
      },
      {
        _id: '130C29DABAB24FE99836DD62450283FA',
        title: 'MusterAngebot',
        number: 'D-12-004889',
        type: 'PSA_OFF',
        format: 'doc',
        createdAt: '2012-09-24T13:08:44Z',
        language: 'GER',
        size: 0.019,
        version: '0.0',
        body: {
          url: orderPdf,
          _id: '00000010444f43554d454e54000000403133304332394441424142323446453939383336444436323435303238334641',
          filename: 'MusterAngebot fur maier.doc',
          contentType: 'application/msword',
          contentLength: 19923,
        },
      },
      {
        _id: '217C72335FC70467E040A8C00F013355',
        title: 'KMK-overview (Karlsruhe Exhibition Centre)',
        number: 'D-06.001471',
        type: 'PSA_BRO',
        format: 'pdf',
        createdAt: '2006-11-09T15:31:13Z',
        language: 'ENG',
        size: 0.105,
        version: '1.0',
        body: {
          url: kmkPdf,
          _id: '00000010444f43554d454e54000000403231374337323333354643373034363745303430413843303046303133333535',
          filename: 'KMK-overview_(Karlsruhe_Exhibition_Centre).pdf',
          contentType: 'application/pdf',
          contentLength: 110100,
        },
      },
      {
        _id: '217C72335FBF0467E040A8C00F013355',
        title: 'INTERPART - figures & facts',
        number: 'D-06.001473',
        type: 'PSA_BRO',
        format: 'mht',
        createdAt: '2006-11-09T15:30:19Z',
        language: 'ENG',
        size: 0.201,
        version: '1.0',
        body: {
          url: orderPdf,
          _id: '00000010444f43554d454e54000000403231374337323333354642463034363745303430413843303046303133333535',
          filename: 'INTERPART_-_figures_&_facts.mht',
          contentType: 'message/rfc822',
          contentLength: 210764,
        },
      },
    ],
  })
}
