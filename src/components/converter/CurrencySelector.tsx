import { MAJOR_CURRENCIES } from '../../utils/currencies' 

type CurrencySelectorProps = {
  value: string
  onChange: (currency: string) => void
}

/** 通貨選択(セレクトボックス) */
export const CurrencySelector: React.FC<CurrencySelectorProps> = props => {
  const { value, onChange } = props

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {MAJOR_CURRENCIES.map(currency => (
        <option key={currency.code} value={currency.code}>
          {currency.flag} {currency.code} - {currency.name}
        </option>
      ))}
    </select>
  )
}
