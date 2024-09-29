export type FromAddress = string;
export interface Transaction {
  toAddress: string;
  // in wei
  amount: string;
  // js unix timestamp
  timestamp: string;
}
// Simple in-memory store that keeps track of the transaction (native send) history of a particular address
export const TRANSACTION_HISTORY = {} as Record<FromAddress, Transaction[]>;

export async function GET(_: Request, { params }: { params: { fromAddress: string } }) {
  return Response.json(TRANSACTION_HISTORY[params.fromAddress]);
}
