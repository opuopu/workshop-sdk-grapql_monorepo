export enum currency {
  BDT = "BDT",
  USD = "USD",
  EUR = "EUR",
}
export type CurrencyType = `${currency}`;
export interface Account {
  id: string;
  userId: string;
  balance: number;
  currency: CurrencyType;
  lastUpdatedAt: Date;
}
