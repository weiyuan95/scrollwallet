'use client';

import { Box, Container, LoadingOverlay, Paper } from '@mantine/core';
import { useMetamaskWallet } from '@/app/MetamaskWalletProvider';
import { ConnectToMetamask } from '@/app/ConnectToMetamask';
import { TransactionsTable } from '@/app/history/TransactionsTable';

export default function Page() {
  const wallet = useMetamaskWallet();

  return (
    <Container size="sm" pt="xl">
      <Paper radius="md" p="xl" mt="md" mb="md" withBorder>
        <Box pos="relative">
          <LoadingOverlay
            visible={wallet.isLoading}
            zIndex={1000}
            overlayProps={{ blur: 1 }}
            loaderProps={{ type: 'dots' }}
          />
          {!wallet.isConnected ? <ConnectToMetamask /> : <TransactionsTable />}
        </Box>
      </Paper>
    </Container>
  );
}
