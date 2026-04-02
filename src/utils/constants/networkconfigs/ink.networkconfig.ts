import { assertNotNull } from "@subsquid/util-internal";
import { NetworkConfig } from "../network.constant";

export const inkNetworkConfig: NetworkConfig = {
  gatewaySqdUrl: "https://v2.archive.subsquid.io/network/ink-mainnet",
  rpcUrl: assertNotNull(
    process.env.RPC_INK_HTTP,
    "No INK RPC endpoint supplied via env.RPC_INK_HTTP"
  ),
  prometheusPort: parseInt(
    assertNotNull(
      process.env.PROMETHEUS_INK_PORT,
      "No Prometheus INK port supplied via env.PROMETHEUS_INK_PORT"
    )
  ),
  finalityConfirmation: 75,
  requestTimeout: 60000,
  headPollInterval: 30000,
  wrapNative: "",
  chainId: 57073,
  chainTag: "ink",
  accountFactory: {
    address: "0x3B66CAf761bDF40e5174F2DF3ddBB12202F8B9a2".toLowerCase(),
    startBlock: 41_604_423,
  },
  usdc: {
    address: "0x2D270e6886d130D724215A266106e6832161EAEd".toLowerCase(),
    startBlock: 41_545_393,
  },
};
