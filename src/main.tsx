import './index.css'
import { BrowserRouter } from 'react-router'
import { createRoot } from 'react-dom/client'
import { DashboardApp } from './DashboardApp.tsx'
import { Provider } from 'react-redux'
import { store } from './store/store.ts'

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <BrowserRouter>
      <DashboardApp />
    </BrowserRouter>,
  </Provider>
)
