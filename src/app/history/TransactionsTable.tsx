'use client';

import { useMetamaskWallet } from '@/app/MetamaskWalletProvider';
import { useEffect, useState } from 'react';
import { LoadingOverlay, Table, Title } from '@mantine/core';
import { formatBalance } from '@/balance';
import { Transaction } from '@/app/api/transactions/[fromAddress]/history';

export function TransactionsTable() {
  const wallet = useMetamaskWallet();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loadingTransactions, setLoadingTransactions] = useState(false);

  async function getTransactions() {
    setLoadingTransactions(true);
    if (!wallet.address) {
      return;
    }

    const res = await fetch(`/api/transactions/${wallet.address}`);
    const data = await res.json();

    setTransactions(data);
    setLoadingTransactions(false);
  }

  useEffect(() => {
    void getTransactions();
  }, []);

  return (
    <>
      <LoadingOverlay
        visible={loadingTransactions}
        zIndex={1000}
        overlayProps={{ blur: 1 }}
        loaderProps={{ type: 'dots' }}
      />
      <Title>Transaction History</Title>
      <Table.ScrollContainer minWidth={500}>
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>To</Table.Th>
              <Table.Th>Amount (ETH)</Table.Th>
              <Table.Th>Timestamp</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {transactions.map((tx, i) => {
              return (
                <Table.Tr key={i}>
                  <Table.Td>{tx.toAddress}</Table.Td>
                  <Table.Td>{formatBalance(tx.amount)}</Table.Td>
                  <Table.Td>{new Date(Number(tx.timestamp)).toLocaleString()}</Table.Td>
                </Table.Tr>
              );
            })}
          </Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </>
  );
}
