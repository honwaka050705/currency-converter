import { CurrencySelector } from "./CurrencySelector"


type AmountInputProps = {
  amount: string
  onAmountChange: (value: string) => void
  currency: string
  onCurrencyChange: (currency: string) => void
  error?: string | null
}

/** 金額入力部 */
export const AmountInput: React.FC<AmountInputProps> = props => {
  const { amount, onAmountChange, currency, onCurrencyChange, error } = props
  return (
    <div className='input-section'>
      {/* htmlForとは */}
      {/* https://zenn.dev/kimura141899/articles/6e11e3a165460d */}
      <label>換算元</label>
      <div className='currency-input'>
        <input
          type='number'
          value={amount}
          onChange={(e) => onAmountChange(e.target.value)}
          placeholder='金額を入力'
          className={error ? 'error' : ''}
          min='0'
          step='0.01'
        />
        <CurrencySelector
          value={currency}
          onChange={onCurrencyChange}
        />
      </div>
      {error && 
        <div className='input-error'>
          {error}
        </div>
      }
    </div>
  )
}