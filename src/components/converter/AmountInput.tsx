import { CurrencySelector } from "./CurrencySelector"


type AmountInputProps = {
  amount: string
  handleAmountChange: (value: string) => void
  value: string
  onChange: (currency: string) => void
  amountError?: string | null
}

/** 金額入力部 */
export const AmountInput: React.FC<AmountInputProps> = props => {
  const { amount, handleAmountChange, value, onChange, amountError } = props
  return (
    <div className='input-section'>
      <label>換算元</label>
      <div className='currency-input'>
        <input
          type='number'
          value={amount}
          onChange={(e) => handleAmountChange(e.target.value)}
          placeholder='金額を入力'
          className={amountError ? 'error' : ''}
        />
        <CurrencySelector
          value={value}
          onChange={onChange} />
      </div>
      {amountError && 
        <div className='input-error'>
          {amountError}
        </div>
      }
    </div>
  )
}