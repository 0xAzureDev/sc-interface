import { METAMASK_DOWNLOAD_LINK } from 'constants/'
import { isInstalled } from 'helpers'
import { FC } from 'react'
import { useSelector } from 'react-redux'
import { walletAddress } from 'store/contractSlice'
import { FunctionButtonInterface } from 'types'

const FunctionButton: FC<FunctionButtonInterface> = ({ submitTx }) => {
  const address = useSelector(walletAddress)

  return (
    <>
      {isInstalled() && address ? (
        <button
          className="header-button function"
          type="button"
          style={{ marginBottom: '1rem', color: '#fff' }}
          onClick={submitTx}
        >
          Submit
        </button>
      ) : isInstalled() && !address ? (
        <button
          className="header-button function"
          type="button"
          style={{ marginBottom: '1rem', color: '#fff' }}
        >
          No Wallet Connected
        </button>
      ) : (
        <button
          className="header-button function"
          type="button"
          style={{ marginBottom: '1rem', color: '#fff' }}
          onClick={() => window.open(METAMASK_DOWNLOAD_LINK)}
        >
          Install Metamask
        </button>
      )}
    </>
  )
}

export default FunctionButton
