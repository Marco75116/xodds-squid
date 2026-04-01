import * as accountFactoryAbi from "../../abi/accountFactory";
import { handleAccountCreated } from "../../mappings/accountFactory";

export const accountFactoryLogsHandlers = new Map([
  [accountFactoryAbi.events.AccountCreated.topic, handleAccountCreated],
]);