export type FromAddress = string;
export interface Transaction {
  toAddress: string;
  // in wei
  amount: string;
  // js unix timestamp
  timestamp: string;
}

export const TRANSACTION_HISTORY = {} as Record<FromAddress, Transaction[]>;
