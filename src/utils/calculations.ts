// 通過変換計算
export const convertCurrency = (
  amount: number,
  fromRate: number,
  toRate: number
): number => {
  if (fromRate === 0) return 0

  const result = (amount / fromRate) * toRate

  // 小数点４桁で四捨五入
  return Math.round(result * 10000) / 10000
}

// 手数料計算(一般的な銀行手数料 2から4%)
export const calculateFee = (
  amount: number,
  feePercentage: number = 2.5
): number => {
  const fee = (amount * feePercentage) /100
  return Math.round(fee * 100) / 100
}

// 手数料差引後の受け取り金額計算(実際の受取額)
export const calculateActualAmount = (
  convertedAmount: number,
  feePercentage: number = 2.5
): number => {
  const fee = calculateFee(convertedAmount, feePercentage)
  return Math.round((convertedAmount - fee) * 100) / 100
}

// 数値のフォーマット(通貨表示用)
export const formatCurrency = (
  amount: number,
  currencyCode: string,
  local: string = 'en-US'
): string => {
  try {
    return new Intl.NumberFormat(local, {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: 2,
      maximumFractionDigits: 4
    }).format(amount)
  } catch(error) {
    console.log(error)
    return `${amount.toFixed(2)} ${currencyCode}`
  }
}

// 数値のバリデーション
export const validateAmount = (value: string): {isValid: boolean, error: string | null} => {
  // 必須チェック
  if (!value.trim()) {
    return {isValid: false, error: '金額を入力してください。'}
  }

  const numVal = parseFloat(value)

  // 数値チェック
  if (isNaN(numVal)) {
    return {isValid: false, error: '金額は半角数字で入力してください。'}
  }

  // 最小値チェック
  if (numVal < 0) {
    return {isValid: false, error: '金額は0より大きい数字を入力してください。'}
  }

  // 最大値チェック
  if (numVal > 1000000000) {
    return {isValid: false, error: '10億以下の数字を入力してください。'}
  }

  // 正常
  return {isValid: true, error: null}
}


