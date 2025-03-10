import { connect, currentSiteId, load, Obj } from 'scrivito'
import errorBackground from '../assets/images/error-background.jpg'
import spaceman from '../assets/images/spaceman.svg'
import { useEffect, useState } from 'react'
import { ensureString } from '../utils/ensureString'
import { ModalSpinner } from './ModalSpinner'

const CONTENT_FORMAT = 'portal-app:6'
const KNOWN_CONTENT_FORMATS: Record<string, string> = {
  'portal-app:5': 'https://v5.scrivito-portal-app.pages.dev',
}

export const VerifyContentFormat = connect(function VerifyContentFormat({
  children,
}: {
  children: React.ReactNode
}) {
  if (import.meta.env.VERIFY_CONTENT_FORMAT) {
    return <StrictContentFormat>{children}</StrictContentFormat>
  }

  return children
})

const StrictContentFormat = connect(function StrictContentFormat({
  children,
}: {
  children: React.ReactNode
}) {
  const [validFormat, setValidFormat] = useState<boolean | undefined>(undefined)

  useEffect(() => {
    verifyContentFormat().then(setValidFormat)
  }, [])

  if (validFormat === undefined) return <ModalSpinner />
  if (validFormat) return children

  return (
    <main id="main">
      <section className="bg-danger vh-100 py-5">
        <img
          src={errorBackground}
          alt="factory"
          className="img-background img-zoom"
        />
        <div className="container h-100">
          <div className="row h-100 align-items-center">
            <div className="col-sm-6">
              <img src={spaceman} alt="spaceman" />
            </div>
            <div className="col-sm-6">
              <h1 className="display-1">Error</h1>
              <h3 className="h3">
                Content format “{ensureString(Obj.root()?.get('contentFormat'))}
                ” not supported.
              </h3>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
})

/** Returns true, if the content format is valid. */
async function verifyContentFormat(): Promise<boolean> {
  const siteId = await load(() => currentSiteId())
  if (!siteId) return true

  const root = await load(() => Obj.root())
  if (!root) return true

  const currentContentFormat = root.get('contentFormat')
  if (currentContentFormat === CONTENT_FORMAT) return true

  if (typeof currentContentFormat !== 'string') return false
  if (!currentContentFormat) return false

  const redirectOrigin = KNOWN_CONTENT_FORMATS[currentContentFormat]
  if (!redirectOrigin) return false

  const url = location.href.replace(location.origin, redirectOrigin)
  location.replace(url)

  return never() // location.replace will trigger a redirect
}

function never() {
  return new Promise<never>(() => {})
}
