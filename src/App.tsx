import * as Scrivito from 'scrivito'
import { ErrorBoundary } from './Components/ErrorBoundary'
import { NotFoundErrorPage } from './Components/NotFoundErrorPage'

function App() {
  return (
    <ErrorBoundary>
      <Scrivito.CurrentPage />
      <Scrivito.NotFoundErrorPage>
        <NotFoundErrorPage />
      </Scrivito.NotFoundErrorPage>
    </ErrorBoundary>
  )
}

export default App
