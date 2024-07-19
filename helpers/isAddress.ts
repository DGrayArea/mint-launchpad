export function isAddress(address: string): boolean {
  // Check if the address matches the 40 character hexadecimal format
  const regex = /^0x[a-fA-F0-9]{40}$/;
  return regex.test(address);
}
