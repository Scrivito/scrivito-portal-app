import { useEffect } from 'react'
import { setPisaAuthorization } from '../Data/pisaClient'

const JwtTokenName = 'token'

export function ExtractJwtToken() {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const token = urlParams.get(JwtTokenName)
    setPisaAuthorization(token ? `JWT ${token}` : null)
  }, [])

  return null
}
