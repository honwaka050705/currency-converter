/**
 * 変換履歴の型定義
 */
export type ConversionHistory = {
  id: string;
  fromCurrency: string;
  fromAmount: number;
  toAmount: number;
  rate: number;
  timestamp: string;
}