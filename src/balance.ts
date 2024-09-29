import { BigNumberish, ethers } from 'ethers';

// Truncate the balance to 8 decimal places, since anything more than that is not really meaningful
export function formatBalance(balanceInWei: BigNumberish): string {
  const balanceInEth = ethers.formatEther(balanceInWei);
  // truncate the string to 8 decimal places
  // ethers.formatEther() returns a decimal string, so the '.' is always present
  return balanceInEth.slice(0, balanceInEth.indexOf('.') + 9);
}
