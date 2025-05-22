import { currentLanguage } from 'scrivito'
import { toast } from 'react-toastify'

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
  toast.dismiss(toastId)
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
