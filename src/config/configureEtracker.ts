import { currentUser, getInstanceId, isEditorLoggedIn, load } from 'scrivito'

declare global {
  interface Window {
    _etr?: { protocol: string }
    _etracker?: { setUserEmailAddress: (email: string) => void }
    _etrackerOnReady?: Array<() => void>
  }
}

export function configureEtracker() {
  if (typeof window === 'undefined') return
  if (isEditorLoggedIn()) return

  // Copyright (c) 2000-2026 etracker GmbH. All rights reserved.
  // No reproduction, publication or modification allowed without permission.
  // etracker code 6.0
  window._etr = { protocol: 'https://' }

  const script = document.createElement('script')
  script.id = '_etLoader'
  script.type = 'text/javascript'
  script.setAttribute('data-block-cookies', 'true')
  script.setAttribute('data-instance-id', getInstanceId())
  script.setAttribute('data-page-changed-detection', 'url')
  script.src = 'https://code.etracker.com/code/e.js'
  script.async = true

  document.head.appendChild(script)

  registerUserEmail()
}

function registerUserEmail() {
  window._etrackerOnReady = window._etrackerOnReady ?? []
  window._etrackerOnReady.push(async () => {
    const email = await load(() => currentUser()?.email())
    if (email) window._etracker?.setUserEmailAddress(email)
  })
}
