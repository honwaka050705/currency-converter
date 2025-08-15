import { useState, useEffect, useCallback } from "react";
import type { ExchangeRates } from "../types/exchangeRates";
import { fetchExchangeRatesWithCache } from "../utils/api";

type UseCurrencyRatesReturn = {
  rates: ExchangeRates | null
  loading: boolean
  error: string | null
  refetch: (baseCurrency?: string) => Promise<void>
  lastUpdated: string | null
}

export const useCurrencyRates = (initialBaseCurrency: string = 'USD'): UseCurrencyRatesReturn => {
  const [rates, setRates] = useState<ExchangeRates | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<string | null>(null)

  const fetchRates = useCallback(async(baseCurrency: string = initialBaseCurrency) => {
    try {
      setLoading(true)
      setError(null)
      console.log(`useCurrencyRates.baseCurrency: ${baseCurrency}`)
      const data = await fetchExchangeRatesWithCache(baseCurrency)
      // console.log(`data: ${data}`)
      setRates({
        base: data.base,
        date: data.date,
        rates: data.rates
      })

      setLastUpdated(new Date().toLocaleTimeString('ja-JP'))
    } catch (error) {
      const errorMessage = error instanceof Error
        ? error.message
        : '為替レートを取得できませんでした。インターネット接続などをご確認ください。'
      setError(errorMessage)
      console.error('為替レートを取得できませんでした。', error)
    } finally {
      setLoading(false)
    }
  }, [initialBaseCurrency])

  useEffect(() => {
    fetchRates(initialBaseCurrency)
  }, [fetchRates, initialBaseCurrency])

  return {
    rates,
    loading,
    error,
    refetch: fetchRates,
    lastUpdated
  }
}