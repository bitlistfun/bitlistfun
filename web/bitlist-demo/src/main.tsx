import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { WalletProvider } from './components'
import './lib/polyfill'

createRoot(document.getElementById('root')!).render(
  <WalletProvider>
    <App />
  </WalletProvider>
  ,
)
