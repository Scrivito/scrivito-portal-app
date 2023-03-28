import * as Scrivito from 'scrivito'
import './App.css'
import './Objs/index'
import './Widgets/index'

function App() {
  return (
    <div className="App">
      <div id="mainContent">
        <Scrivito.CurrentPage />
      </div>
    </div>
  )
}

export default App
