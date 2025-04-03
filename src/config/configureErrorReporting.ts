import { currentUser, getInstanceId, isEditorLoggedIn, load } from 'scrivito'
import Honeybadger from '@honeybadger-io/js'

export async function configureErrorReporting() {
  if (!import.meta.env.HONEYBADGER_API_KEY) return

  const honeybadger = Honeybadger.configure({
    apiKey: import.meta.env.HONEYBADGER_API_KEY,
    environment: import.meta.env.HONEYBADGER_ENVIRONMENT,
    revision: import.meta.env.HONEYBADGER_REVISION,
  })

  const user = await load(() => currentUser())
  honeybadger.setContext({
    instance_id: getInstanceId(),
    is_editor: isEditorLoggedIn(),
    user_id: user?.email(),
  })

  honeybadger.notify('sam-v6 in use')
}
