import { currentLanguage } from 'scrivito'
import { toast, Zoom } from 'react-toastify'
import messages from './i18n.visitor.json'
import rosetta from 'rosetta'

const i18n = rosetta(messages)
const lang = currentLanguage() ?? 'en'
i18n.locale(lang in messages ? lang : 'en')

export async function notifyOnConnectionTimeout<T>(connection: Promise<T>) {
  const connectionSucceeded = await Promise.race([
    connection.then(() => true),
    waitFor(5).then(() => false),
  ])
  if (connectionSucceeded) return

  const toastId = toast.warning(
    <div>
      <div>{i18n.t('unableToConnect')}</div>
      <small>{i18n.t('pisaSalesServerRunning')}</small>
    </div>,
    { autoClose: false, closeButton: true },
  )

  await connection
  toast.update(toastId, {
    type: 'success',
    render: <div>{i18n.t('backendNowConnected')}</div>,
    autoClose: 5000,
    transition: Zoom,
  })
}

async function waitFor(seconds: number) {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000))
}
