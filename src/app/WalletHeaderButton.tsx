import { Button, Popover, rem, Stack, Text } from '@mantine/core';
import { IconWallet } from '@tabler/icons-react';
import { useMetamaskWallet } from '@/app/MetamaskWalletProvider';
import classes from '@/app/shell.module.css';

export function WalletHeaderButton() {
  const wallet = useMetamaskWallet();

  if (wallet.isConnected) {
    return (
      <div className={classes.control}>
        <Popover position="bottom">
          <Popover.Target>
            <div>
              <Button
                leftSection={<IconWallet style={{ width: rem(16), height: rem(16) }} />}
                variant="outline"
                fullWidth
              >
                {truncateAddress(wallet.address)}
              </Button>
            </div>
          </Popover.Target>
          <Popover.Dropdown>
            <Stack gap="xs">
              <Text ta="center" hiddenFrom="xs">
                {truncateAddress(wallet.address)}
              </Text>
              <Button color="red" onClick={async () => await wallet.disconnect()}>
                Disconnect
              </Button>
            </Stack>
          </Popover.Dropdown>
        </Popover>
      </div>
    );
  }

  return (
    <Button onClick={() => wallet.connect()} leftSection={<IconWallet style={{ width: rem(16), height: rem(16) }} />}>
      Connect
    </Button>
  );
}
function truncateAddress(address: string | undefined) {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}
