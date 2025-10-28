import { Context, Log } from "../processor";
import * as usdcAbi from "../abi/usdc";
import { createUsdcTransfer } from "../utils/entities/usdctransfert";
import { EntityManager } from "../utils/EntityManager";
import { getTransferId } from "../utils/helpers/ids.helper";

export const handleTransfer = async (
  ctx: Context,
  log: Log,
  entities: EntityManager
) => {
  let { from, to, value } = usdcAbi.events.Transfer.decode(log);

  const transfer = createUsdcTransfer(log, from, to, value);
  entities.usdcTransfersMap.set(getTransferId(log.id), transfer);
};
