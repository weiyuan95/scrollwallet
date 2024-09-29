'use client';
import { createContext, ReactNode, useContext, useState } from 'react';
import { BrowserProvider, Signer } from 'ethers';
import { notifications } from '@mantine/notifications';

export type WalletContextI = {
  isConnected: boolean;
  isLoading: boolean;
  isErrored: boolean;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  provider: BrowserProvider | undefined;
  signer: Signer | undefined;
  address: string | undefined;
  balanceInWei: bigint | undefined;
};

const MetamaskWalletContext = createContext<WalletContextI | undefined>(undefined);

export function MetamaskWalletProvider({ children }: { children: ReactNode }): ReactNode {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isErrored, setIsErrored] = useState(false);
  const [provider, setProvider] = useState<BrowserProvider | undefined>();
  const [signer, setSigner] = useState<Signer | undefined>();
  const [address, setAddress] = useState<string | undefined>();
  // Note: canonicalBalance is the balance in ETH, and is the balance that is fetched when the wallet is connected
  // This balance should not be used for validation purposes, and it's possible that the balance is out of date.
  const [balanceInWei, setBalanceInWei] = useState<bigint | undefined>();

  const onMount = async () => {
    setIsLoading(true);
    // Check if there are connected accounts
    const accounts = await window.ethereum.request({ method: 'eth_accounts' });

    // Assumption that only 1 account is used in the app
    if (accounts.length > 0) {
      await connectToMetamask();
    }

    setIsLoading(false);
  };

  useState(() => {
    void onMount();
  }, []);

  const connectToMetamask = async () => {
    setIsLoading(true);
    try {
      await switchToScrollSepolia();
      // Hardcode the chainId - we only interact with Scroll Sepolia for this exercise
      const provider = new BrowserProvider(window.ethereum, 534351);
      // Prompt user to switch to the Scroll Sepolia network
      const signer = await provider.getSigner();

      setProvider(provider);
      setSigner(signer);
      setIsConnected(true);
      const walletAddress = await signer.getAddress();
      setAddress(walletAddress);
      setBalanceInWei(await provider.getBalance(walletAddress));
    } catch (e) {
      setIsErrored(true);
      // We don't worry too much about the error for this exercise
      notifications.show({
        title: 'Error',
        message: 'Failed to disconnect from Metamask',
        color: 'red',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const disconnectFromMetamask = async () => {
    setIsLoading(true);
    try {
      await window.ethereum.request({
        method: 'wallet_revokePermissions',
        params: [
          {
            eth_accounts: {},
          },
        ],
      });
      setIsConnected(false);
      setAddress(undefined);
      setProvider(undefined);
      setSigner(undefined);
    } catch (e) {
      // We don't worry too much about the error for this exercise
      setIsErrored(true);
      notifications.show({
        title: 'Error',
        message: 'Failed to disconnect from Metamask',
        color: 'red',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MetamaskWalletContext.Provider
      value={{
        isConnected,
        isLoading,
        isErrored,
        provider,
        signer,
        address,
        balanceInWei,
        connect: connectToMetamask,
        disconnect: disconnectFromMetamask,
      }}
    >
      {children}
    </MetamaskWalletContext.Provider>
  );
}

export function useMetamaskWallet(): WalletContextI {
  const context = useContext(MetamaskWalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}

async function switchToScrollSepolia(): Promise<void> {
  try {
    // Prompt user to switch to the Scroll Sepolia network
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: '0x8274f' }], // chainId must be in hexadecimal numbers
    });
  } catch {
    // If the use has not added the Scroll Sepolia network, add it
    await window.ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [
        {
          chainId: '0x8274f',
          chainName: 'Scroll Sepolia Testnet',
          rpcUrls: ['https://sepolia-rpc.scroll.io'],
          iconUrls: [],
          nativeCurrency: {
            name: 'ETH',
            symbol: 'ETH',
            decimals: 18,
          },
          blockExplorerUrls: ['https://sepolia.scrollscan.com/'],
        },
      ],
    });
  }
}
