import { createBrowserHistory, BrowserHistory } from 'history'
import { useHistory as scrivitoUseHistory } from 'scrivito'
import { scrollToFragment } from 'scroll-to-fragment'

export function configureHistory(): void {
  const history = getHistory()
  if (!history) return

  scrivitoUseHistory(history)

  scrollToFragment({ history })
}

let currentHistory: BrowserHistory | undefined

function getHistory(): BrowserHistory | undefined {
  if (typeof window === 'undefined') return

  if (!currentHistory) currentHistory = createBrowserHistory()
  return currentHistory
}
