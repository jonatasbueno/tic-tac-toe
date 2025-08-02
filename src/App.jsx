import { RouterProvider } from "react-router-dom";
import { AppProvider } from './providers/AppProvider'
import { router } from "./router";

import './styles/index.css'

function App() {
  return (
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  )
}

export default App