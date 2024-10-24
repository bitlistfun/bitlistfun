// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import { WalletProvider } from './components'
import './lib/polyfill'

createRoot(document.getElementById('root')!).render(
  <WalletProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </WalletProvider>
  ,
)
