import { ethNetworkConfig } from "./networkconfigs/eth.networkconfig";

export type Config = {
  address: string;
  startBlock: number;
};

export type NetworkConfig = {
  gatewaySqdUrl: string;
  rpcUrl: string;
  prometheusPort: number;
  finalityConfirmation: number;
  wrapNative: string;
  chainId: number;
  chainTag: string;
  usdc: Config;
};

export const networksConfigs: Record<string, NetworkConfig> = {
  eth: ethNetworkConfig,
};
