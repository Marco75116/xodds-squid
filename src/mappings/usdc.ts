import { UsdcTransfer } from "../model";
import { Log } from "../processor";
import * as usdcAbi from "../abi/usdc";
import { createUsdcTransfer } from "../utils/entities/usdctransfert";

export const handleTransfer = async (log: Log, transfers: UsdcTransfer[]) => {
  let { from, to, value } = usdcAbi.events.Transfer.decode(log);

  const transfer = createUsdcTransfer(log, from, to, value);
  transfers.push(transfer);
};
