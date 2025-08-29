import { UsdcTransfer } from "../../model";
import { Log } from "../../processor";
import { config } from "../../main";

export const createUsdcTransfer = (
  log: Log,
  from: string,
  to: string,
  value: bigint
) => {
  return new UsdcTransfer({
    id: log.id,
    block: log.block.height,
    from,
    to,
    value,
    chainId: config.chainId,
    txnHash: log.transactionHash,
  });
};
