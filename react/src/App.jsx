import { useEffect, useState } from 'react'
import { useAccount, useConnect, useContractWrite, useDisconnect, useNetwork, usePrepareContractWrite } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { Web3Button } from '@web3modal/react'
import './App.css'

const contractABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      }
    ],
    "name": "mint",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]
const contractAddress = "YOUR_CONTRACT_ADDRESS_HERE" // Replace with your deployed contract address

function App() {
  const { address, isConnected } = useAccount()
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })
  const { disconnect } = useDisconnect()
  const { chain } = useNetwork()

  const { config } = usePrepareContractWrite({
    address: contractAddress,
    abi: contractABI,
    functionName: 'mint',
    args: [address],
  })
  const { write: mint, isLoading, isSuccess } = useContractWrite(config)

  const [status, setStatus] = useState('')

  useEffect(() => {
    if (isSuccess) {
      setStatus('NFT minted successfully!')
    }
  }, [isSuccess])

  return (
    <div className="App">
      <h1>MyNFT Minter</h1>
      <Web3Button />
      {isConnected ? (
        <div>
          <p>Connected Account: {address}</p>
          <p>Network: {chain?.name}</p>
          <button onClick={() => mint?.()} disabled={!mint || isLoading}>
            {isLoading ? 'Minting...' : 'Mint NFT'}
          </button>
          <p>{status}</p>
          <button onClick={() => disconnect()}>Disconnect</button>
        </div>
      ) : (
        <p>Please connect your wallet to mint NFTs</p>
      )}
    </div>
  )
}

export default App
