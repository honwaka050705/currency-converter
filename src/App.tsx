import { useState } from 'react'
import { MAJOR_CURRENCIES } from './utils/currencies'
import { useCurrencyRates } from './hooks/useCurrencyRates'
import { convertCurrency, validateAmount } from './utils/calculations' 
import './App.css'

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
    <div className='app'>
      <header className='app-header'>
        <h1>💱 通貨換算ツール</h1>
        <p>リアルタイムな為替レートで計算します。</p>
        {lastUpdated && (
          <small style={{ opacity: 0.8 }}>
            最終更新: {lastUpdated}
          </small>
        )}
      </header>
      <main className='converter-container'>
        <div className='converter-card'>
          {error && (
            <div className='error-message'>
               ⚠️ {error}
            </div>
          )}
          {loading && (
            <div className='loading-message'>
              📡 為替レートを取得中...
            </div>
          )}
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
              <select
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
              >
                {MAJOR_CURRENCIES.map(currency => (
                  <option key={currency.code} value={currency.code}>
                    {currency.flag} {currency.code} - {currency.name}
                  </option>
                ))}
              </select>
            </div>
            {amountError && 
              <div className='input-error'>
                {amountError}
              </div>
            }
          </div>
          <div className='output-section'>
            <label>換算先</label>
            <div className='currency-input'>
              <div className={`result-amount ${amountError ? 'disabled' : ''}`}>
                {calculateResult()}
              </div>
              <select
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
              >
                {MAJOR_CURRENCIES.map(currency => (
                  <option key={currency.code} value={currency.code}>
                    {currency.flag} {currency.code} - {currency.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* 🔥 追加：exchange-arrow */}
          <div className='exchange-arrow'>⇩</div>

          {/* 🔥 追加：rate-info */}
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
