import { Transaction, TRANSACTION_HISTORY } from '@/app/api/transactions/[fromAddress]/route';

export interface AddTransaction {
  fromAddress: string;
  toAddress: string;
  amount: string;
  timestamp: string;
}

export async function POST(request: Request) {
  const reqBody = await request.json();

  // assert that all necessary values are present, if not return 400
  if (!reqBody.fromAddress || !reqBody.toAddress || !reqBody.amount || !reqBody.timestamp) {
    return Response.json({ error: 'missing required fields' }, { status: 400 });
  }

  const validatedRequestBody = reqBody as AddTransaction;
  const tx = {
    toAddress: validatedRequestBody.toAddress,
    // in wei
    amount: validatedRequestBody.amount,
    timestamp: validatedRequestBody.timestamp,
  } as Transaction;

  // if the fromAddress is not in the TRANSACTION_HISTORY object, add it
  if (!TRANSACTION_HISTORY[validatedRequestBody.fromAddress]) {
    TRANSACTION_HISTORY[validatedRequestBody.fromAddress] = [tx];
  } else {
    TRANSACTION_HISTORY[validatedRequestBody.fromAddress].push(tx);
  }

  return Response.json({ message: 'transaction added' });
}
