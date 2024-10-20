import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { WagmiConfig } from 'wagmi'
import { wagmiConfig, ethereumClient, Web3Modal, projectId } from './wagmi'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <WagmiConfig config={wagmiConfig}>
      <App />
    </WagmiConfig>
    <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
  </StrictMode>,
)
