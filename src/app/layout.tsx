import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import type { Metadata } from 'next';
import React from 'react';
import { MetamaskWalletProvider } from '@/app/MetamaskWalletProvider';
import AppShell from '@/app/AppShell';

export const metadata: Metadata = {
  title: 'Scroll dApp',
  description: 'A simple Scroll dApp',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Scroll dApp</title>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider>
          <Notifications position="top-right" limit={3} autoClose={5000} />

          <MetamaskWalletProvider>
            <AppShell>{children}</AppShell>
          </MetamaskWalletProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
