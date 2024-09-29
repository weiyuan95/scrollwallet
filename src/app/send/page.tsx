'use client';
import { useMetamaskWallet } from '@/app/MetamaskWalletProvider';
import { Box, Container, LoadingOverlay, Paper } from '@mantine/core';
import { ConnectToMetamask } from '@/app/ConnectToMetamask';
import { TransactionForm } from '@/app/send/TransactionForm';

export default function Page() {
  const wallet = useMetamaskWallet();

  return (
    <Container size="xs" pt="xl">
      <Paper radius="md" p="xl" mt="md" mb="md" withBorder>
        <Box pos="relative">
          <LoadingOverlay
            visible={wallet.isLoading}
            zIndex={1000}
            overlayProps={{ blur: 1 }}
            loaderProps={{ type: 'dots' }}
          />

          {!wallet.isConnected ? <ConnectToMetamask /> : <TransactionForm />}
        </Box>
      </Paper>
    </Container>
  );
}
