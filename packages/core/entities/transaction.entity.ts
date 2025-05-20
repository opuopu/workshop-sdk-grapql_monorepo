export enum TransactionType {
  CREDIT = "credit",
  TRANSFER = "transfer",
  DEBIT = "debit",
}
// NEW TYPE
export type TransactionTypeType = `${TransactionType}`;

export interface Transaction {
  id: string;
  accountId: string;
  amount: number;
  type: TransactionTypeType;
  lastBalance: number;
  createdAt: Date;
}
