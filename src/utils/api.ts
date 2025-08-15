import type { ApiResponse } from "../types/apiResponse"

const BASE_URL = 'https://api.exchangerate-api.com/v4/latest'

/** 為替レート取得関数 */
export const fetchExchangeRates = async (baseCurrency: string = 'USD'): Promise<ApiResponse> => {
  try {
    const response = await fetch(`${BASE_URL}/${baseCurrency}`)

    if (!response.ok) {
      throw new Error(`為替レートの取得に失敗しました。しばらく時間をおいてから再度お試しください。(status: ${response.status})`)
    }
    console.log(`response: ${response}`)
    const data = await response.json()
    
    // レスポンスの形式チェック
    if (!data.rates || typeof data.rates !== 'object') {
      throw new Error('為替データの形式が正しくありません。再度お試しください。')
    }

    return {
      success: true,
      base: data.base,
      date: data.date,
      rates: data.rates
    }
  } catch(error) {
    console.error('為替レートを取得できませんでした。インターネット接続などをご確認ください。', error)
    throw new Error(
      error instanceof Error ? error.message : '保存されたデータの読み込みに失敗しました。'
    )
  }
}

/** レート制限対策／キャッシュ機能 */
const CACHE_KEY = 'exchange-rates-cache'
// @memo 10分
const CACHE_DURATION = 1000 * 60 * 10

type CacheData = {
  data: ApiResponse
  timestamp: number
}

// キャッシュ無効の場合に再取得->キャッシュに保存
const reFetchExchangeRates = async(baseCurrency: string): Promise<ApiResponse> => {
  console.log('reFetchExchangeRates')
  const freshData = await fetchExchangeRates(baseCurrency)
  // キャッシュに再保存
  const cacheData: CacheData = {
    data: freshData,
    timestamp: Date.now()
  }
  localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData))

  return freshData
}

export const fetchExchangeRatesWithCache = async (baseCurrency: string = 'USD'): Promise<ApiResponse> => {
  const cacheKey = `${CACHE_KEY}-${baseCurrency}`
  const cacheStr = localStorage.getItem(cacheKey)

  if (cacheStr) {
    try {
      const cached: CacheData = JSON.parse(cacheStr)
      const now = Date.now()

      // キャッシュの有効性の確認
      // @memo localstrageのキャッシュが10分以上経過していたら無効
      if (now - cached.timestamp < CACHE_DURATION) {
        console.log('キャッシュデータは有効です。')
        return cached.data
      }
    } catch(error) {
      console.log('キャッシュデータは無効です。:', error)
    } 
  }
  // キャッシュに最新データを取得して保存
  return reFetchExchangeRates(baseCurrency)
}
