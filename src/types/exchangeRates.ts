/**
 * 為替レートの型定義
 */
export type ExchangeRates = {
  base: string;
  date: string;
  rates: Record<string, number>;
}
