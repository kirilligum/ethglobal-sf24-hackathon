import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
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
  const [account, setAccount] = useState('')
  const [provider, setProvider] = useState(null)
  const [signer, setSigner] = useState(null)
  const [contract, setContract] = useState(null)

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum)
        setProvider(provider)

        const signer = await provider.getSigner()
        setSigner(signer)

        const contract = new ethers.Contract(contractAddress, contractABI, signer)
        setContract(contract)
      } else {
        console.log('Please install MetaMask!')
      }
    }
    init()
  }, [])

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
        setAccount(accounts[0])
      } catch (error) {
        console.error("Failed to connect wallet:", error)
      }
    } else {
      console.log('Please install MetaMask!')
    }
  }

  const mintNFT = async () => {
    if (!contract) {
      console.log('Contract not initialized')
      return
    }
    try {
      const tx = await contract.mint(account)
      await tx.wait()
      console.log('NFT minted successfully!')
    } catch (error) {
      console.error("Failed to mint NFT:", error)
    }
  }

  return (
    <div className="App">
      <h1>MyNFT Minter</h1>
      {!account ? (
        <button onClick={connectWallet}>Connect Wallet</button>
      ) : (
        <div>
          <p>Connected Account: {account}</p>
          <button onClick={mintNFT}>Mint NFT</button>
        </div>
      )}
    </div>
  )
}

export default App
