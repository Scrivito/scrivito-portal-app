import * as Scrivito from 'scrivito'

export const CurrentUserDataItem = Scrivito.provideDataItem(
  'CurrentUser',
  async () => ({
    address: `Gartenstraße 10
39104 Magdeburg
Germany`,
    customerId: '6504',
    email: 'jane.smith@example.com',
    jobTitle: 'CNC Machinist',
    name: 'Jane Smith',
    telephone: '+49 391 5976405',
  })
)
