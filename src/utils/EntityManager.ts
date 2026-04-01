import { Store } from "@subsquid/typeorm-store";
import { Account, VaultConfig } from "../model";

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

  async upsertAll(store: Store): Promise<void> {
    await batchUpsert(store, Array.from(this.accountsMap.values()));
    await batchUpsert(store, Array.from(this.vaultConfigsMap.values()));
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
