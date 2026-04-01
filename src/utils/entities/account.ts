import { Account } from "../../model";
import { Log } from "../../processor";
import { config } from "../../main";

export const createAccount = (
  log: Log,
  account: string,
  owner: string,
  operator: string,
  salt: bigint
) => {
  return new Account({
    id: `${config.chainId}-${log.id}`,
    account,
    owner,
    operator,
    salt,
    block: log.block.height,
    chainId: config.chainId,
    txnHash: log.transactionHash,
  });
};
