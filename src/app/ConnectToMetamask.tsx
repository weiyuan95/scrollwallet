'use client';
import { Button, Stack, Text } from '@mantine/core';
import { useMetamaskWallet } from '@/app/MetamaskWalletProvider';

export function ConnectToMetamask() {
  const metamask = useMetamaskWallet();

  return (
    <Stack gap="sm" align="center">
      <Text size="lg" fw={500}>
        Get started with Scroll
      </Text>
      <Button
        onClick={async () => {
          await metamask.connect();
        }}
      >
        Connect to Metamask
      </Button>
    </Stack>
  );
}
