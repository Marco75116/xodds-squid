import { Withdrawal } from "../../model";
import { Log } from "../../processor";
import { config } from "../../main";

export const createWithdrawal = (
  log: Log,
  token: string,
  to: string,
  amount: bigint
) => {
  return new Withdrawal({
    id: `${config.chainId}-${log.id}`,
    account: log.address,
    token,
    to,
    amount,
    block: log.block.height,
    chainId: config.chainId,
    txnHash: log.transactionHash,
  });
};
