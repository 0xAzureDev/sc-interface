import { validateInput } from 'helpers'
import { transactNonPayable, transactView } from 'helpers/Transact'
import { FC, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { contractAbi, contractAddress } from 'store/contractSlice'
import { Abi } from 'types'
import FunctionButton from './FunctionButton'
import FunctionInput from './FunctionInput'
import FunctionOutput from './FunctionOutput'

const FunctionList: FC<Abi> = ({ name, inputs, outputs, stateMutability }) => {
  const [toggle, setToggle] = useState(false)
  const [paramInput, setInputs] = useState<{
    [key: string]: string
  }>()
  const [response, setResponse] = useState<string>()

  const abi = useSelector(contractAbi)
  const contract = useSelector(contractAddress)

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

  const submitTx = async () => {
    let parsedParams: string[] = []

    if (paramInput) {
      Object.entries(paramInput).forEach(([key, value], _) => {
        if (!validateInput(value, inputs[key as any]?.type)) {
          console.error(
            `${value} is not a valid input for ${inputs[key as any]?.type}`,
          )
          return
        }
        parsedParams.push(value)
        console.log(inputs[key as any])
      })
    }

    if (!(inputs.length === Object.keys(paramInput ?? 0).length))
      return notifyError('Ensure that all input fields are filled')
    if (!(parsedParams.length === inputs.length))
      return notifyError(
        'Input field type is not valid, please double check your inputs',
      )
    if (!abi) return notifyError('No ABI found')
    if (!contract) return notifyError('No contract address found')

    if (stateMutability === 'view') {
      const res = await transactView(name, abi, contract, parsedParams)

      if (res === 0)
        return notifyError('Something went wrong transacting view function.')

      setResponse(res.toString())
    } else if (stateMutability === 'nonpayable') {
      const res = await transactNonPayable(name, abi, contract, parsedParams)

      if (res === 0)
        return notifyError(
          'Something went wrong transacting nonpayable function.',
        )

      setResponse(res.toString())
    } else if (stateMutability === 'payable') {
      console.error('payable functions are not supported yet')
    } else {
      notifyError('Something went wrong... Try again')
    }

    return
  }

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setInputs({
      ...(paramInput as { [key: string]: string }),
      [name]: value,
    })
  }

  return (
    <>
      <div className="function-list-container">
        <button
          className="header-button function"
          type="button"
          onClick={() => setToggle(!toggle)}
        >
          {name}
        </button>
        {toggle && (
          <div className="function-list-content-stats">
            <p>State Mutability: {stateMutability}</p>

            <FunctionInput inputs={inputs} handleInput={handleInput} />

            <FunctionOutput outputs={outputs} />

            {response && <h2>Response: {response}</h2>}

            <FunctionButton submitTx={submitTx} />
          </div>
        )}
      </div>
    </>
  )
}

export default FunctionList
