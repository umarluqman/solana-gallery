export const truncateAddress = (address: string, length = 5) => {
  return `${address?.slice(0, length)}...${address?.slice(-length)}`;
};
