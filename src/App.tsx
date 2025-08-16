import { useState } from 'react'
import { useCurrencyRates } from './hooks/useCurrencyRates'
import { validateAmount } from './utils/calculations' 
import './App.css'
import { Header } from './components/layout/Header';
import { AmountInput } from './components/converter/AmountInput'
import { ConvertedAmount } from './components/converter/ConvertedAmount';
import { LoadingSpinner } from './components/common/LoadingSpinner';
import { ErrorMessage } from './components/common/ErrorMessage';

function App() {
  const [fromCurrency, setFromCurrency] = useState('USD')
  const [toCurrency, setToCurrency] = useState('JPY')
  const [amount, setAmount] = useState('100')

  const [amountError, setAmountError] = useState<string | null>(null)
  
  const { rates, loading, error, lastUpdated } = useCurrencyRates(fromCurrency)

  const handleAmountChange = (value: string) => {
    setAmount(value)

    const validation = validateAmount(value)
    setAmountError(validation.isValid ? null : validation.error )
  }

  return (
    <div className='app'>
      <Header lastUpdated={lastUpdated} />
      <main className='converter-container'>
        <div className='converter-card'>
          <ErrorMessage
            error={error}
          />
          {/* {error && (
            <div className='error-message'>
               ⚠️ {error}
            </div>
          )} */}
          <LoadingSpinner loading={loading} />
          <AmountInput
            amount={amount}
            handleAmountChange={handleAmountChange}
            value={fromCurrency}
            onChange={setFromCurrency}
            amountError={amountError}
          />
          <ConvertedAmount
            amount={amount}
            fromCurrency={fromCurrency}
            toCurrency={toCurrency}
            rates={rates}
            onChange={setToCurrency}
            amountError={amountError}
           />
          <div className='exchange-arrow'>⇩</div>
          <div className='rate-info'>
            {rates && !loading && (
              <small>
                💱 1 {fromCurrency} = {(rates.rates[toCurrency] / rates.rates[fromCurrency]).toFixed(4)} {toCurrency}
                <br />
                データ提供: exchangerate-api.com
              </small>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
