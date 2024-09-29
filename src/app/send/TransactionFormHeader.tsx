'use client';
import { Flex, Title } from '@mantine/core';

export function TransactionFormHeader() {
  return (
    <Flex justify="space-between" align="center">
      <Title order={4} hiddenFrom="xs">
        You&apos;re sending
      </Title>
      <Title order={3} visibleFrom="sm">
        You&apos;re sending
      </Title>
    </Flex>
  );
}
