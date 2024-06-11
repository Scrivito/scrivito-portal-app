import { provideLocalStorageDataClass } from '../../../utils/provideLocalStorageDataClass'
import spiderImage from './FakeBinaries/Schulung_Spider_30.png'
import roadshowImage from './FakeBinaries/TYNACOON_Roadshow.jpg'

export async function localStorageEventDataClass() {
  return provideLocalStorageDataClass('Event', {
    initialContent: [
      {
        _id: 'DD6585A543FE48018F497D3631332C6F',
        keyword: 'Schulung: Wirkungsprinzipien Typ Spider 30',
        number: 'P-11-007950',
        beginsAt: '2024-04-29T13:30:00Z',
        endsAt: '2024-04-29T14:30:00Z',
        location: 'Schulungszentrum 1',
        organizer: '',
        responsibleAgent: '0BD5DC0F9DA442C5946FA7ECAF870D7B',
        status: 'PSA_PRO_EVT_REG_OPN',
        url: '',
        logo: { url: spiderImage },
        language: 'GER',
        freeSeats: null,
        attendanceFee: 0.0,
        description: '',
      },
      {
        _id: '4100600152A8FFCBE040007F01002CE3',
        keyword: 'TYNACOON - Roadshow',
        number: 'P-07.006325',
        beginsAt: '2024-05-06T12:19:00Z',
        endsAt: '2024-05-06T13:19:00Z',
        location: 'Nürnberg',
        organizer: 'K & R Messe GmbH & Co.KG (Karlsruhe)',
        responsibleAgent: 'F203EF15869B46509B2BE0AB12D480D2',
        status: 'PSA_PRO_EVT_REG_OPN',
        url: 'http://www.tynacoon-roadshow.de',
        logo: { url: roadshowImage },
        language: 'GER',
        freeSeats: null,
        attendanceFee: 0.0,
        description:
          'Pilotveranstaltung: Roadshow mit einem Show-Truck. Auf dem Truck sind Maschinen und Geräte installiert und können von den Besuchern teilweise im Betrieb begutachtet werden. Der Show-Truck fährt eine Woche die aktuellen Interessenten ab.',
      },
    ],
  })
}
