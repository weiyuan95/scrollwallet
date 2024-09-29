'use client';
import { ReactNode } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { AppShell as MantineAppShell, Burger, Group, Title, UnstyledButton } from '@mantine/core';

import classes from './shell.module.css';
import { useRouter } from 'next/navigation';
import { WalletHeaderButton } from '@/app/WalletHeaderButton';

export default function AppShell({ children }: Readonly<{ children: ReactNode }>) {
  const [opened, { toggle }] = useDisclosure();
  const router = useRouter();

  return (
    <MantineAppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { desktop: true, mobile: !opened } }}
      padding="md"
    >
      <MantineAppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Group justify="space-between" style={{ flex: 1 }}>
            <Title>ScrollWallet</Title>
            <Group ml="xl" gap={0} visibleFrom="sm">
              <UnstyledButton
                className={classes.control}
                onClick={() => {
                  router.push('/');
                }}
              >
                Balance
              </UnstyledButton>
              <UnstyledButton
                className={classes.control}
                onClick={() => {
                  router.push('/send');
                }}
              >
                Send
              </UnstyledButton>
              <UnstyledButton
                className={classes.control}
                onClick={() => {
                  router.push('/history');
                }}
              >
                History
              </UnstyledButton>
              <WalletHeaderButton />
            </Group>
          </Group>
        </Group>
      </MantineAppShell.Header>

      <MantineAppShell.Navbar py="md" px={4}>
        <UnstyledButton
          className={classes.control}
          onClick={() => {
            router.push('/');
            toggle();
          }}
        >
          Balance
        </UnstyledButton>
        <UnstyledButton
          className={classes.control}
          onClick={() => {
            router.push('/send');
            toggle();
          }}
        >
          Send
        </UnstyledButton>
        <UnstyledButton
          className={classes.control}
          onClick={() => {
            router.push('/history');
            toggle();
          }}
        >
          History
        </UnstyledButton>
        <WalletHeaderButton />
      </MantineAppShell.Navbar>

      <MantineAppShell.Main>{children}</MantineAppShell.Main>
    </MantineAppShell>
  );
}
