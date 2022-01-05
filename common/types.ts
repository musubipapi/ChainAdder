export type ChainInfo = {
  name: string;
  chainId: number;
  shortName: string;
  networkId: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  rpc: string[];
  faucets: string[];
  infoURL: string;
};
