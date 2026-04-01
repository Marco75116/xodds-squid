import { Context, Log } from "../processor";
import * as userAccountAbi from "../abi/userAccount";
import { createWithdrawal } from "../utils/entities/withdrawal";
import { EntityManager } from "../utils/EntityManager";
import { getWithdrawalId } from "../utils/helpers/ids.helper";

export const handleWithdrawn = async (
  ctx: Context,
  log: Log,
  entities: EntityManager
) => {
  let { token, to, amount } = userAccountAbi.events.Withdrawn.decode(log);

  const withdrawal = createWithdrawal(log, token, to, amount);
  entities.withdrawalsMap.set(getWithdrawalId(log.id), withdrawal);
};
