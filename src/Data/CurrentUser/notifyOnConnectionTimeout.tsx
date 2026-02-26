import { setupVisitorI18n } from '../../i18n'
import { toast, Zoom } from 'react-toastify'
import messages from './i18n.visitor.json'

const t = setupVisitorI18n(messages)

export async function notifyOnConnectionTimeout<T>(connection: Promise<T>) {
  const connectionSucceeded = await Promise.race([
    connection.then(() => true),
    waitFor(5).then(() => false),
  ])
  if (connectionSucceeded) return

  const toastId = toast.warning(
    <div>
      <div>{t('unableToConnect')}</div>
      <small>{t('pisaSalesServerRunning')}</small>
    </div>,
    { autoClose: false, closeButton: true },
  )

  await connection
  toast.update(toastId, {
    type: 'success',
    render: <div>{t('backendNowConnected')}</div>,
    autoClose: 5000,
    transition: Zoom,
  })
}

async function waitFor(seconds: number) {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000))
}
