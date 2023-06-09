import * as Scrivito from 'scrivito'
import { NotFoundErrorPage } from './Components/NotFoundErrorPage'

function App() {
  return (
    <>
      <Scrivito.CurrentPage />
      <Scrivito.NotFoundErrorPage>
        <NotFoundErrorPage />
      </Scrivito.NotFoundErrorPage>
    </>
  )
}

export default App
