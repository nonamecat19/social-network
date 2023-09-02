import ReactDOM from 'react-dom/client'
import './styles/index.css'
import { Router } from './app/Router.tsx'
import { Providers } from './app/Providers.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Providers>
      <Router />
  </Providers>,
)
