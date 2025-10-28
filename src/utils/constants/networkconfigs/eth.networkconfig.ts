import { assertNotNull } from "@subsquid/util-internal";
import { NetworkConfig } from "../network.constant";

export const ethNetworkConfig: NetworkConfig = {
  gatewaySqdUrl: "https://v2.archive.subsquid.io/network/ethereum-mainnet",
  rpcUrl: assertNotNull(
    process.env.RPC_ETHEREUM_HTTP,
    "No ETH RPC endpoint supplied via env.RPC_ETHEREUM_HTTP"
  ),
  prometheusPort: parseInt(
    assertNotNull(
      process.env.PROMETHEUS_ETHEREUM_PORT,
      "No Prometheus ETH port supplied via env.PROMETHEUS_ETHEREUM_PORT"
    )
  ),
  finalityConfirmation: 75,
  requestTimeout: 60000,
  headPollInterval: 30000,
  wrapNative: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2".toLowerCase(),
  chainId: 1,
  chainTag: "eth",
  usdc: {
    address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48".toLowerCase(),
    startBlock: 6_082_465,
  },
};
