export type ApiResponse = {
  success: boolean;
  base: string;
  date: string;
  rates: Record<string, number>;
}