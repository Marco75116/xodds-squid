import * as accountFactoryAbi from "../../abi/accountFactory";
import * as userAccountAbi from "../../abi/userAccount";
import {
  handleAccountCreated,
  handleVaultConfigured,
} from "../../mappings/accountFactory";
import { handleWithdrawn } from "../../mappings/userAccount";

export const accountFactoryLogsHandlers = new Map([
  [accountFactoryAbi.events.AccountCreated.topic, handleAccountCreated],
  [accountFactoryAbi.events.VaultConfigured.topic, handleVaultConfigured],
]);

export const userAccountLogsHandlers = new Map([
  [userAccountAbi.events.Withdrawn.topic, handleWithdrawn],
]);