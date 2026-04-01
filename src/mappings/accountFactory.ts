import { Context, Log } from "../processor";
import * as accountFactoryAbi from "../abi/accountFactory";
import { createAccount } from "../utils/entities/account";
import { createVaultConfig } from "../utils/entities/vaultConfig";
import { EntityManager } from "../utils/EntityManager";
import { getAccountId, getVaultConfigId } from "../utils/helpers/ids.helper";

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

export const handleVaultConfigured = async (
  ctx: Context,
  log: Log,
  entities: EntityManager
) => {
  let { account, owner, tokens, allocations, dcaAmount, dcaFrequency } =
    accountFactoryAbi.events.VaultConfigured.decode(log);

  const vaultConfig = createVaultConfig(
    log,
    account,
    owner,
    tokens,
    allocations,
    dcaAmount,
    dcaFrequency
  );
  entities.vaultConfigsMap.set(getVaultConfigId(log.id), vaultConfig);
};
