import { assertNotNull } from "@subsquid/util-internal";
import { NetworkConfig } from "../network.constant";

export const ethereumNetworkConfig: NetworkConfig = {
  gatewaySqdUrl: "https://v2.archive.subsquid.io/network/ethereum-mainnet",
  rpcUrl: assertNotNull(
    process.env.RPC_ETH_HTTP,
    "No ETH RPC endpoint supplied via env.RPC_ETH_HTTP"
  ),
  prometheusPort: parseInt(
    assertNotNull(
      process.env.PROMETHEUS_ETH_PORT,
      "No Prometheus ETH port supplied via env.PROMETHEUS_ETH_PORT"
    )
  ),
  finalityConfirmation: 75,
  requestTimeout: 60000,
  headPollInterval: 30000,
  wrapNative: "",
  chainId: 1,
  chainTag: "eth",
  accountFactory: {
    address: "0x52ce41F6B4e95b6891F93Ad85165b525412e1362".toLowerCase(),
    startBlock: 24_784_999,
  },
  usdc: {
    address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48".toLowerCase(),
    startBlock: 24_784_999,
  },
};
