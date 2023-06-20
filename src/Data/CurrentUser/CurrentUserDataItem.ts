import * as Scrivito from 'scrivito'

export const CurrentUserDataItem = Scrivito.provideDataItem(
  'CurrentUser',
  async () => ({
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    address: `Gartenstraße 10
39104 Magdeburg
Germany`,
    telephone: '+49 391 5976405',
    jobTitle: 'CNC Machinist',
  })
)
