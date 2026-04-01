import { VaultConfig } from "../../model";
import { Log } from "../../processor";
import { config } from "../../main";

export const createVaultConfig = (
  log: Log,
  account: string,
  owner: string,
  tokens: string[],
  allocations: bigint[],
  dcaAmount: bigint,
  dcaFrequency: bigint
) => {
  return new VaultConfig({
    id: `${config.chainId}-${log.id}`,
    account,
    owner,
    tokens,
    allocations: allocations.map((a) => a.toString()),
    dcaAmount,
    dcaFrequency,
    block: log.block.height,
    chainId: config.chainId,
    txnHash: log.transactionHash,
  });
};
