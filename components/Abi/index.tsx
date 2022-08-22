import { prettyPrint } from 'helpers'
import { FC, useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { updateContractAbi } from 'store/contractSlice'
import InputButtons from './InputButtons'
import InputField from './InputField'

const ABIInterface: FC = () => {
  const [message, setMessage] = useState('')
  const dispatch = useDispatch()

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

  const paste = () => {
    try {
      navigator.clipboard
        .readText()
        .then((text) => {
          setMessage(prettyPrint(text))
          dispatch(updateContractAbi(text))
        })
        .catch((err) => {
          console.error('Failed to read clipboard contents: ', err)
        })
    } catch (error) {
      console.error('Failed to read clipboard contents: ', error)
      notifyError(
        'Pasting from clipboard is not supported on Firefox browsers.',
      )
    }
  }

  const handleMessageChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setMessage(prettyPrint(event.target.value))
    dispatch(updateContractAbi(event.target.value))
  }

  const upload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return

    const file = event.target.files[0]
    const reader = new FileReader()
    try {
      reader.readAsText(file as Blob)
      reader.onload = () => {
        setMessage(reader.result as string)
        dispatch(updateContractAbi(reader.result as string))
      }
    } catch (_) {}
  }

  return (
    <>
      <InputButtons paste={paste} upload={upload} />
      <InputField message={message} handleMessageChange={handleMessageChange} />
    </>
  )
}

export default ABIInterface
