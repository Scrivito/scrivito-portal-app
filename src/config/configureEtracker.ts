import { isEditorLoggedIn } from 'scrivito'

declare global {
  interface Window {
    _etr?: { protocol: string }
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
  script.setAttribute('data-secure-code', 'L9bLhx')
  script.setAttribute('data-page-changed-detection', 'url')
  script.src = 'https://code.etracker.com/code/e.js'
  script.async = true

  document.head.appendChild(script)
}
