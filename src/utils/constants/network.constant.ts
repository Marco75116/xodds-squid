import { ethereumNetworkConfig } from "./networkconfigs/ethereum.networkconfig";
import { inkNetworkConfig } from "./networkconfigs/ink.networkconfig";

export type Config = {
  address: string;
  startBlock: number;
};

export type NetworkConfig = {
  gatewaySqdUrl: string;
  rpcUrl: string;
  prometheusPort: number;
  finalityConfirmation: number;
  requestTimeout: number;
  headPollInterval: number;
  wrapNative: string;
  chainId: number;
  chainTag: string;
  accountFactory: Config;
  usdc: Config;
};

export const networksConfigs: Record<string, NetworkConfig> = {
  eth: ethereumNetworkConfig,
  ink: inkNetworkConfig,
};
