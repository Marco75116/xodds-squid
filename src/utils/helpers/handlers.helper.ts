import * as usdcAbi from "../../abi/usdc";
import { handleTransfer } from "../../mappings/usdc";

export const usdcLogsHandlers = new Map([
  [usdcAbi.events.Transfer.topic, handleTransfer],
]);