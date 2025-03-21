let cachedAuthorization: string | null | undefined
export function getTokenAuthorization(): string | null {
  if (cachedAuthorization === undefined) {
    cachedAuthorization = calculateAuthorization()
  }

  return cachedAuthorization
}

function calculateAuthorization() {
  if (typeof window === 'undefined') return null

  const urlParams = new URLSearchParams(window.location.search)
  const token = urlParams.get('token')

  return token ? `JWT ${token}` : null
}
