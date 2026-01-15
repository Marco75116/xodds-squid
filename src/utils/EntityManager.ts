import { Store } from "@subsquid/typeorm-store";
import { UsdcTransfer } from "../model";

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
  readonly usdcTransfersMap = new Map<string, UsdcTransfer>();

  async upsertAll(store: Store): Promise<void> {
    await batchUpsert(store, Array.from(this.usdcTransfersMap.values()));
  }
}

export const getUsdcTransferFromMapOrDb = async (
  store: Store,
  entities: EntityManager,
  usdcTransferId: string
): Promise<UsdcTransfer | undefined> => {
  let usdcTransfer = entities.usdcTransfersMap.get(usdcTransferId);
  if (!usdcTransfer) {
    usdcTransfer = await store.get(UsdcTransfer, usdcTransferId);
    if (usdcTransfer) {
      entities.usdcTransfersMap.set(usdcTransferId, usdcTransfer);
    }
  }
  return usdcTransfer;
};
