import { isUserLoggedIn } from 'scrivito'

let cachedAuthorization: string | null | undefined = undefined
export function getPisaAuthorization(): string | null {
  if (cachedAuthorization === undefined) {
    cachedAuthorization = calculateAuthorization()
  }

  return cachedAuthorization
}

function calculateAuthorization() {
  if (isUserLoggedIn()) return null

  if (typeof window === 'undefined') return null

  const urlParams = new URLSearchParams(window.location.search)
  const token = urlParams.get('token')

  return token ? `JWT ${token}` : null
}
