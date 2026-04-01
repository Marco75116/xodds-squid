import { Context, Log } from "../processor";
import * as accountFactoryAbi from "../abi/accountFactory";
import { createAccount } from "../utils/entities/account";
import { EntityManager } from "../utils/EntityManager";
import { getAccountId } from "../utils/helpers/ids.helper";

export const handleAccountCreated = async (
  ctx: Context,
  log: Log,
  entities: EntityManager
) => {
  let { account, owner, operator, salt } =
    accountFactoryAbi.events.AccountCreated.decode(log);

  const accountEntity = createAccount(log, account, owner, operator, salt);
  entities.accountsMap.set(getAccountId(log.id), accountEntity);
};
