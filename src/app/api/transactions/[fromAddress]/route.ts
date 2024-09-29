import { TRANSACTION_HISTORY } from '@/app/api/transactions/[fromAddress]/history';

export async function GET(_: Request, { params }: { params: { fromAddress: string } }) {
  return Response.json(TRANSACTION_HISTORY[params.fromAddress] ?? []);
}
