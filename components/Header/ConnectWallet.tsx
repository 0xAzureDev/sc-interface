import { ethers } from 'ethers'
import { chainIdToName, isInstalled } from 'helpers'
import { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { setWalletAddress, walletAddress } from 'store/contractSlice'
import ConnectButton from './ConnectButton'

const ConnectWallet: FC = () => {
  const [isMetamaskInstalled, setIsMetamaskInstalled] = useState<boolean>(true)
  const [chainId, setChainId] = useState<string | undefined>(undefined)

  const address = useSelector(walletAddress)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!isInstalled()) return setIsMetamaskInstalled(false)

    window.ethereum.on('chainChanged', () => {
      const chainIdName = chainIdToName(window.ethereum.chainId ?? '0x1')
      setChainId(chainIdName)
    })

    window.ethereum.on('accountsChanged', (accounts: any) => {
      if (accounts.length === 0) dispatch(setWalletAddress(undefined))
    })
  }, [])

  const notifyError = (message: string) =>
    toast(<p className="toast">{message}</p>, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      rtl: false,
      pauseOnFocusLoss: true,
      draggable: true,
      pauseOnHover: true,
      type: 'error',
    })

  const connectWallet = async () => {
    if (!isInstalled()) return setIsMetamaskInstalled(false)

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum as any)
      await provider.send('eth_requestAccounts', [])
      const signer = provider.getSigner()
      const address = await signer.getAddress()

      dispatch(setWalletAddress(address))

      const chainIdName = chainIdToName(window.ethereum.chainId ?? '0x1')
      setChainId(chainIdName)
    } catch (error) {
      console.error('Error connecting to wallet', error)
      notifyError('Failed to connect wallet! Try again')
    }
  }

  const disconnectWallet = () => dispatch(setWalletAddress(undefined))

  return (
    <>
      <ConnectButton
        address={address}
        isMetamaskInstalled={isMetamaskInstalled}
        chainId={chainId}
        disconnectWallet={disconnectWallet}
        connectWallet={connectWallet}
      />
      <ToastContainer />
    </>
  )
}

export default ConnectWallet
