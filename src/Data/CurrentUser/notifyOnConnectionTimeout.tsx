import { currentLanguage } from 'scrivito'
import { toast, Zoom } from 'react-toastify'

export async function notifyOnConnectionTimeout<T>(connection: Promise<T>) {
  const connectionSucceeded = await Promise.race([
    connection.then(() => true),
    waitFor(5).then(() => false),
  ])
  if (connectionSucceeded) return

  const toastId = toast.warning(
    <div>
      <div>{localizeUnableToConnect()}</div>
      <small>{localizePisaSalesServerRunning()}</small>
    </div>,
    { autoClose: false, closeButton: true },
  )

  await connection
  toast.update(toastId, {
    type: 'success',
    render: <div>{localizeBackendNowConnected()}</div>,
    autoClose: 5000,
    transition: Zoom,
  })
}

async function waitFor(seconds: number) {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000))
}

function localizeUnableToConnect() {
  switch (currentLanguage()) {
    case 'de':
      return 'Keine Backend-Verbindung.'
    case 'fr':
      return 'Pas de connexion au backend.'
    case 'pl':
      return 'Brak połączenia z backendem.'
    default:
      return 'No backend connection.'
  }
}

function localizePisaSalesServerRunning() {
  switch (currentLanguage()) {
    case 'de':
      return 'Läuft der PisaSales-Server?'
    case 'fr':
      return "Le serveur PisaSales est-il en cours d'exécution\u00a0?"
    case 'pl':
      return 'Czy serwer PisaSales działa?'
    default:
      return 'Is the PisaSales server running?'
  }
}

function localizeBackendNowConnected() {
  switch (currentLanguage()) {
    case 'de':
      return 'Backend ist jetzt verbunden.'
    case 'fr':
      return 'Le backend est maintenant connecté.'
    case 'pl':
      return 'Backend został teraz połączony.'
    default:
      return 'Backend is now connected.'
  }
}
