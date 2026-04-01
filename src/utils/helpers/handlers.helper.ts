import * as accountFactoryAbi from "../../abi/accountFactory";
import {
  handleAccountCreated,
  handleVaultConfigured,
} from "../../mappings/accountFactory";

export const accountFactoryLogsHandlers = new Map([
  [accountFactoryAbi.events.AccountCreated.topic, handleAccountCreated],
  [accountFactoryAbi.events.VaultConfigured.topic, handleVaultConfigured],
]);