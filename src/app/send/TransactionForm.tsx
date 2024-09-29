'use client';
import { TransactionFormHeader } from '@/app/send/TransactionFormHeader';
import { useForm } from '@mantine/form';
import { Button, Group, Divider, TextInput, Text } from '@mantine/core';
import { ethers } from 'ethers';
import { useMetamaskWallet } from '@/app/MetamaskWalletProvider';
import { notifications } from '@mantine/notifications';
import { formatBalance } from '@/balance';

export function TransactionForm() {
  const { balanceInWei, signer } = useMetamaskWallet();

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      address: '',
      amount: '',
    },

    validate: {
      address: (value) => {
        try {
          ethers.getAddress(value);
          return null;
        } catch {
          return 'Invalid address';
        }
      },
      amount: (value) => {
        try {
          // Best effort validation which assumes that the balance is not modified asynchronously outside the app
          // If this validation fails, the chain itself will still reject the transaction, which we will
          // show to the user as an error notification
          const amountToSend = ethers.parseUnits(value, 'ether');
          if (amountToSend > (balanceInWei ?? 0)) {
            return 'Insufficient balance';
          }
          return null;
        } catch (e) {
          return 'Invalid amount';
        }
      },
    },
  });
  return (
    <>
      <TransactionFormHeader />
      <Divider my="md" />
      <form
        onSubmit={form.onSubmit(async ({ address, amount }) => {
          if (!signer) {
            notifications.show({
              title: 'Error',
              message: 'Unexpected error in sending transaction',
              color: 'red',
            });
            return;
          }

          try {
            const resp = await signer.sendTransaction({
              to: address,
              value: ethers.parseUnits(amount, 'ether'),
            });
            await fetch(`/api/transactions/`, {
              method: 'POST',
              body: JSON.stringify({
                fromAddress: await signer.getAddress(),
                toAddress: address,
                timestamp: Date.now().toString(),
                amount: ethers.formatUnits(ethers.parseUnits(amount, 'ether'), 'wei'),
              }),
            });

            notifications.show({
              title: 'Success',
              message: `Transaction sent. Explorer link: https://sepolia.scrollscan.com/tx/${resp.hash}`,
              color: 'green',
            });
          } catch {
            notifications.show({
              title: 'Error',
              message: 'Unexpected error in sending transaction. You can refresh the page to update your balance.',
              color: 'red',
            });
          } finally {
            form.reset();
          }
        })}
      >
        <TextInput
          withAsterisk
          label="Amount (in ETH)"
          placeholder="1"
          key={form.key('amount')}
          {...form.getInputProps('amount')}
        />
        <Text size="sm" c="dimmed" ta="end">
          Balance: {formatBalance(balanceInWei ?? 0)} ETH
        </Text>
        <TextInput
          withAsterisk
          label="To"
          placeholder="0x..."
          key={form.key('address')}
          {...form.getInputProps('address')}
        />

        <Group justify="flex-end" mt="md">
          {/* No explicit confirmation since that step is done on the Metamask extension */}
          <Button type="submit">Send</Button>
        </Group>
      </form>
    </>
  );
}
