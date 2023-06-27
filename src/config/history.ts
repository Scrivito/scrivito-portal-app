import { createBrowserHistory, BrowserHistory } from 'history'
import * as Scrivito from 'scrivito'
import { scrollToFragment } from 'scroll-to-fragment'

export function configureHistory(): void {
  const history = getHistory()
  if (!history) return

  Scrivito.useHistory(history)

  scrollToFragment({ history })
}

let currentHistory: BrowserHistory | undefined

export function getHistory(): BrowserHistory | undefined {
  if (typeof window === 'undefined') return

  if (!currentHistory) currentHistory = createBrowserHistory()
  return currentHistory
}
