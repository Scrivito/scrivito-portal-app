import { currentUser, load, provideDataItem } from 'scrivito'

export const CurrentUserDataItem = provideDataItem('CurrentUser', async () => {
  const user = await load(currentUser)
  if (!user) return {}

  return {
    jrUserId: user.id(),
    name: user.name(),
    email: user.email(),
  }
})
