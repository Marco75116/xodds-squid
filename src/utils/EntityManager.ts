import { Context } from "../processor";
import { UsdcTransfer } from "../model";

export class EntityManager {
  readonly usdcTransfersMap = new Map<string, UsdcTransfer>();

  async upsertAll(ctx: Context): Promise<void> {
    await ctx.store.upsert(Array.from(this.usdcTransfersMap.values()));
  }
}
