import { AppProvider } from '../infrastructure/providers/AppProvider'
import { Game } from './pages/Game'

import './styles/index.css'

function App() {
  return (
    <AppProvider>
      <Game />
    </AppProvider>
  )
}

export default App