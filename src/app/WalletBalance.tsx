import { useMetamaskWallet } from '@/app/MetamaskWalletProvider';
import { Stack, Text } from '@mantine/core';
import { formatBalance } from '@/balance';

export function WalletBalance() {
  const metamask = useMetamaskWallet();

  return (
    <Stack gap="sm" align="center">
      <Text size="lg" fw={500}>
        Wallet Balance
      </Text>
      <Text>{formatBalance(metamask.balanceInWei ?? 0)} ETH</Text>
    </Stack>
  );
}
