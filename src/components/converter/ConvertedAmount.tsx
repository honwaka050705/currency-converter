import { CurrencySelector } from "./CurrencySelector" 
import type { ExchangeRates } from "../../types/exchangeRates"
import { convertCurrency } from "../../utils/calculations"
import { useMemo } from "react"

type ConvertedAmountProps = {
  amount: string
  fromCurrency: string
  toCurrency: string
  rates: ExchangeRates | null
  onCurrencyChange: (currency: string) => void
  error?: string | null
}

/** レート変換結果表示部 */
export const ConvertedAmount: React.FC<ConvertedAmountProps> = props => {
  const { amount, fromCurrency, toCurrency, rates, onCurrencyChange, error } = props

  const calculateResult = useMemo((): string => {
    if (!rates || !amount || error || isNaN(parseFloat(amount))) {
      return '0.00'
    }

    const fromRate = rates.rates[fromCurrency] || 1
    const toRate = rates.rates[toCurrency] || 1
    const numAmount = parseFloat(amount)

    const result = convertCurrency(numAmount, fromRate, toRate)

    return result.toFixed(2)
  }, [amount, fromCurrency, toCurrency, rates, error])

  return (
    <div className='output-section'>
      <label>換算先</label>
      <div className='currency-input'>
        <div className={`result-amount ${error ? 'disabled' : ''}`}>
          {calculateResult}
        </div>
        <CurrencySelector
          value={toCurrency}
          onChange={onCurrencyChange} />
      </div>
    </div>    
  )
}