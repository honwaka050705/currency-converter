import { CurrencySelector } from "./CurrencySelector" 
import type { ExchangeRates } from "../../types/exchangeRates"
import { convertCurrency } from "../../utils/calculations"

type ConvertedAmountProps = {
  amount: string
  fromCurrency: string
  toCurrency: string
  rates: ExchangeRates | null
  onChange: (currency: string) => void
  amountError?: string | null
}

/** レート変換結果表示部 */
export const ConvertedAmount: React.FC<ConvertedAmountProps> = props => {
  const { amount, fromCurrency, toCurrency, rates, onChange, amountError } = props

  const calculateResult = (): string => {
    if (!rates || !amount || amountError || isNaN(parseFloat(amount))) {
      return '0.00'
    }

    const fromRate = rates.rates[fromCurrency] || 1
    const toRate = rates.rates[toCurrency] || 1
    const numAmount = parseFloat(amount)

    const result = convertCurrency(numAmount, fromRate, toRate)

    return result.toFixed(2)
  }

  return (
    <div className='output-section'>
      <label>換算先</label>
      <div className='currency-input'>
        <div className={`result-amount ${amountError ? 'disabled' : ''}`}>
          {calculateResult()}
        </div>
        <CurrencySelector
          value={toCurrency}
          onChange={onChange} />
      </div>
    </div>    
  )
}