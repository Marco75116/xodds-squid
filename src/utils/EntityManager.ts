import { Store } from "@subsquid/typeorm-store";
import { Account, VaultConfig, Withdrawal } from "../model";

const BATCH_SIZE = 2000;

async function batchUpsert<T extends { id: string }>(
  store: Store,
  entities: T[]
): Promise<void> {
  if (entities.length === 0) return;

  if (entities.length <= BATCH_SIZE) {
    await store.upsert(entities);
  } else {
    for (let i = 0; i < entities.length; i += BATCH_SIZE) {
      await store.upsert(entities.slice(i, i + BATCH_SIZE));
    }
  }
}

export class EntityManager {
  readonly accountsMap = new Map<string, Account>();
  readonly vaultConfigsMap = new Map<string, VaultConfig>();
  readonly withdrawalsMap = new Map<string, Withdrawal>();

  async upsertAll(store: Store): Promise<void> {
    await batchUpsert(store, Array.from(this.accountsMap.values()));
    await batchUpsert(store, Array.from(this.vaultConfigsMap.values()));
    await batchUpsert(store, Array.from(this.withdrawalsMap.values()));
  }
}

export const getAccountFromMapOrDb = async (
  store: Store,
  entities: EntityManager,
  accountId: string
): Promise<Account | undefined> => {
  let account = entities.accountsMap.get(accountId);
  if (!account) {
    account = await store.get(Account, accountId);
    if (account) {
      entities.accountsMap.set(accountId, account);
    }
  }
  return account;
};

export const getAccountByAddress = async (
  store: Store,
  entities: EntityManager,
  address: string
): Promise<Account | undefined> => {
  for (const account of entities.accountsMap.values()) {
    if (account.account === address) return account;
  }
  const account = await store.findOneBy(Account, { account: address });
  if (account) {
    entities.accountsMap.set(account.id, account);
  }
  return account ?? undefined;
};

export const getVaultConfigFromMapOrDb = async (
  store: Store,
  entities: EntityManager,
  vaultConfigId: string
): Promise<VaultConfig | undefined> => {
  let vaultConfig = entities.vaultConfigsMap.get(vaultConfigId);
  if (!vaultConfig) {
    vaultConfig = await store.get(VaultConfig, vaultConfigId);
    if (vaultConfig) {
      entities.vaultConfigsMap.set(vaultConfigId, vaultConfig);
    }
  }
  return vaultConfig;
};
